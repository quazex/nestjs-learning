import { Extensions, IEnv, IOptionalVariable } from 'env-var';

export type IDotenv<TSchema extends Extensions = Extensions> = IEnv<IOptionalVariable<Extensions>, TSchema>;
