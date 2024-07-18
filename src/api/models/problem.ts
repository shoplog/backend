import { Static } from '@sinclair/typebox';
import { ProblemSchema, ValidationProblemSchema } from 'src/api/schemas/problem.schema';

export type Problem = Static<typeof ProblemSchema>;
export type ValidationProblem = Static<typeof ValidationProblemSchema>;
