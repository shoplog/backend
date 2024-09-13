import { MainDatabase } from 'src/data/main/database';

class Deferred<T> {
	readonly #promise: Promise<T>;

	#resolve?: (value: T | PromiseLike<T>) => void;
	#reject?: (reason?: unknown) => void;

	constructor() {
		this.#promise = new Promise<T>((resolve, reject) => {
			this.#reject = reject;
			this.#resolve = resolve;
		});
	}

	get promise(): Promise<T> {
		return this.#promise;
	}

	resolve = (value: T | PromiseLike<T>): void => {
		if (this.#resolve) {
			this.#resolve(value);
		}
	};

	reject = (reason?: unknown): void => {
		if (this.#reject) {
			this.#reject(reason);
		}
	};
}

export type Transaction = {
	transaction: MainDatabase;
	commit: () => void;
	rollback: () => void;
};

export async function beginTransaction(db: MainDatabase): Promise<Transaction> {
	const connection = new Deferred<MainDatabase>();
	const result = new Deferred<unknown>();

	db.transaction()
		.execute((txn) => {
			connection.resolve(txn);
			return result.promise;
		})
		.catch(() => {
			// Don't do anything here. Just swallow the exception.
		});

	const transaction = await connection.promise;

	return {
		transaction,
		commit: () => result.resolve(null),
		rollback: () => result.reject(new Error('Transaction was rolled back')),
	};
}
