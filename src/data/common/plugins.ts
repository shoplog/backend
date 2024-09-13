import {
	ColumnNode,
	ColumnUpdateNode,
	KyselyPlugin,
	PluginTransformQueryArgs,
	PluginTransformResultArgs,
	QueryResult,
	RootOperationNode,
	UnknownRow,
	ValueNode,
} from 'kysely';

export class UpdatedAtPlugin implements KyselyPlugin {
	transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
		if (args.node.kind === 'UpdateQueryNode') {
			const update = ColumnUpdateNode.create(
				ColumnNode.create('updated_at'),
				ValueNode.create(new Date().toISOString())
			);

			const updates = [...(args.node.updates ?? []), update];

			return {
				...args.node,
				updates,
			};
		}

		return args.node;
	}
	transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>> {
		return Promise.resolve(args.result);
	}
}
