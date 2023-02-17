import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TGraphqlCtx } from './graphql_ctx';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Guest = {
  __typename?: 'Guest';
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGuest?: Maybe<Guest>;
  deleteGuest?: Maybe<Guest>;
  login?: Maybe<LoginData>;
  updateGuest?: Maybe<Guest>;
};


export type MutationAddGuestArgs = {
  data: AddGuestInput;
};


export type MutationDeleteGuestArgs = {
  guestId: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateGuestArgs = {
  data: UpdateGuestInput;
};

export type Query = {
  __typename?: 'Query';
  guest?: Maybe<Guest>;
  guests?: Maybe<Array<Maybe<Guest>>>;
};


export type QueryGuestArgs = {
  guestId: Scalars['ID'];
};

export type AddGuestInput = {
  address: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export enum AuthRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type LoginData = {
  __typename?: 'loginData';
  message?: Maybe<Scalars['String']>;
  user?: Maybe<LoginUserData>;
};

export type LoginUserData = {
  __typename?: 'loginUserData';
  fullName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UpdateGuestInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  guestId: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Guest: ResolverTypeWrapper<Guest>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  addGuestInput: AddGuestInput;
  authRole: AuthRole;
  loginData: ResolverTypeWrapper<LoginData>;
  loginUserData: ResolverTypeWrapper<LoginUserData>;
  updateGuestInput: UpdateGuestInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Guest: Guest;
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  addGuestInput: AddGuestInput;
  loginData: LoginData;
  loginUserData: LoginUserData;
  updateGuestInput: UpdateGuestInput;
};

export type AuthDirectiveArgs = {
  requires: AuthRole;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = TGraphqlCtx, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GuestResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Guest'] = ResolversParentTypes['Guest']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addGuest?: Resolver<Maybe<ResolversTypes['Guest']>, ParentType, ContextType, RequireFields<MutationAddGuestArgs, 'data'>>;
  deleteGuest?: Resolver<Maybe<ResolversTypes['Guest']>, ParentType, ContextType, RequireFields<MutationDeleteGuestArgs, 'guestId'>>;
  login?: Resolver<Maybe<ResolversTypes['loginData']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  updateGuest?: Resolver<Maybe<ResolversTypes['Guest']>, ParentType, ContextType, RequireFields<MutationUpdateGuestArgs, 'data'>>;
};

export type QueryResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  guest?: Resolver<Maybe<ResolversTypes['Guest']>, ParentType, ContextType, RequireFields<QueryGuestArgs, 'guestId'>>;
  guests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Guest']>>>, ParentType, ContextType>;
};

export type LoginDataResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['loginData'] = ResolversParentTypes['loginData']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['loginUserData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginUserDataResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['loginUserData'] = ResolversParentTypes['loginUserData']> = {
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = TGraphqlCtx> = {
  Date?: GraphQLScalarType;
  Guest?: GuestResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  loginData?: LoginDataResolvers<ContextType>;
  loginUserData?: LoginUserDataResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = TGraphqlCtx> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
