declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCtiDetailVo_ = {
    code?: number;
    data?: CtiDetailVo;
    message?: string;
  };

  type BaseResponseCtiWordLabelVo_ = {
    code?: number;
    data?: CtiWordLabelVo;
    message?: string;
  };

  type BaseResponseHomeViewDataVo_ = {
    code?: number;
    data?: HomeViewDataVo;
    message?: string;
  };

  type BaseResponseListCtiRules_ = {
    code?: number;
    data?: CtiRules[];
    message?: string;
  };

  type BaseResponseListGraphVo_ = {
    code?: number;
    data?: GraphVo[];
    message?: string;
  };

  type BaseResponseListString_ = {
    code?: number;
    data?: string[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseMapLongItem_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseNodeRelCtiVo_ = {
    code?: number;
    data?: NodeRelCtiVo;
    message?: string;
  };

  type BaseResponsePageCtiVo_ = {
    code?: number;
    data?: PageCtiVo_;
    message?: string;
  };

  type BaseResponsePageItemVo_ = {
    code?: number;
    data?: PageItemVo_;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageRelationTypeVo_ = {
    code?: number;
    data?: PageRelationTypeVo_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type CtiAddRequest = {
    content?: string;
    title?: string;
  };

  type CtiChunk = {
    createTime?: string;
    ctiId?: number;
    endOffset?: number;
    id?: number;
    isDelete?: number;
    itemId?: number;
    sentText?: string;
    startOffset?: number;
    updateTime?: string;
    userId?: number;
  };

  type CtiChunkAddRequest = {
    ctiChunkData?: CtiChunkDto[];
  };

  type CtiChunkDto = {
    ctiId?: number;
    endOffset?: number;
    itemId?: number;
    sentText?: string;
    startOffset?: number;
  };

  type CtiDeleteRequest = {
    id?: number;
  };

  type CtiDetailQueryRequest = {
    /** cti情报的id */
    id?: number;
  };

  type CtiDetailVo = {
    /** cti情报摘要 */
    abstractText?: string;
    /** cti情报的内容 */
    content?: string;
    createTime?: string;
    /** cti数据分块 */
    ctiChunkList?: CtiChunk[];
    /** 实体的总数量 */
    entityNum?: number;
    /** cti情报html内容 */
    htmlText?: string;
    /** cti情报的id */
    id?: number;
    scoNum?: number;
    sdoNum?: number;
    /** cti情报的标题 */
    title?: string;
    updateTime?: string;
    user?: NoRoleUserVo;
  };

  type CtiEntityInnerAddRequest = {
    ctiId?: number;
    labelList?: string;
    wordList?: string;
  };

  type CtiGraphQueryRequest = {
    id?: number;
  };

  type CtiModelWordLabelResultDto = {
    ctiId?: number;
    current?: number;
    size?: number;
  };

  type CtiNodeRelCtiQueryRequest = {
    ctiId?: number;
    nodeName?: string;
  };

  type CtiQueryRequest = {
    createTime?: string;
    current?: number;
    offset?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    /** Cti标题 */
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type CtiRuleDeleteRequest = {
    ruleId?: number;
  };

  type CtiRuleQueryRequest = {
    ctiId?: number;
    ruleName?: string;
  };

  type CtiRuleRequest = {
    ctiId?: number;
    processRuleName?: string;
    requestId?: string;
  };

  type CtiRules = {
    createTime?: string;
    ctiId?: number;
    filePath?: string;
    id?: number;
    isDelete?: number;
    llmResult?: string;
    llmStatus?: number;
    ruleDescription?: string;
    ruleFileStatus?: number;
    ruleName?: string;
    ruleType?: number;
    singleRequestId?: string;
    updateTime?: string;
  };

  type CtiUpdateRequest = {
    content?: string;
    id?: number;
  };

  type CtiVo = {
    createTime?: string;
    entityNum?: number;
    hasGraph?: number;
    id?: number;
    scoNum?: number;
    sdoNum?: number;
    title?: string;
    updateTime?: string;
  };

  type CtiWordLabelVo = {
    labelList?: string[][];
    total?: number;
    wordList?: string[][];
  };

  type DeleteRequest = {
    id?: number;
  };

  type downloadRuleByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type downloadTtpConfigByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type EntityAddRequest = {
    ctiId?: number;
    entityName?: string;
    itemId?: number;
  };

  type FluxString_ = {
    prefetch?: number;
  };

  type getItemIdByItemNameUsingPOST1Params = {
    /** endItemId */
    endItemId: number;
    /** relationName */
    relationName: string;
    /** startItemId */
    startItemId: number;
  };

  type getItemIdByItemNameUsingPOSTParams = {
    /** itemName */
    itemName: string;
  };

  type getLlmAnsByStreamUsingGETParams = {
    systemPrompts?: string;
    userQuestion?: string;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type GraphNodeVo = {
    createTime?: string;
    ctiId?: number;
    ctiName?: string;
    entityName?: string;
    itemData?: ItemVo;
    nodeId?: number;
    updateTime?: string;
  };

  type GraphVo = {
    endNode?: GraphNodeVo;
    relation?: RelationVo;
    startNode?: GraphNodeVo;
  };

  type HomeViewDataVo = {
    ctiCount?: number;
    scoCount?: number;
    scoItemHomeVos?: ItemHomeVo[];
    sdoCount?: number;
    sdoItemHomeVos?: ItemHomeVo[];
  };

  type Item = {
    backgroundColor?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    itemContent?: string;
    itemName?: string;
    itemType?: number;
    itemTypeContent?: string;
    textColor?: string;
    updateTime?: string;
  };

  type ItemDeleteRequest = {
    /** item删除的id */
    id?: number;
  };

  type ItemHomeVo = {
    backgroundColor?: string;
    id?: number;
    itemContent?: string;
    itemDbCount?: number;
    itemName?: string;
    itemType?: number;
    itemTypeContent?: string;
    textColor?: string;
  };

  type ItemQueryRequest = {
    /** 创建时间 */
    createTime?: string;
    current?: number;
    /** item的解释/内容 */
    itemContent?: string;
    /** item的名称 */
    itemName?: string;
    /** item的类型,sco/sdo,2是sdo,1是sco */
    itemType?: number;
    /** sco的全称或者是sdo的全称 */
    itemTypeContent?: string;
    offset?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type ItemUpdateRequest = {
    backgroundColor?: string;
    id?: number;
    itemContent?: string;
    itemName?: string;
    itemType?: number;
    itemTypeContent?: string;
    textColor?: string;
  };

  type ItemVo = {
    backgroundColor?: string;
    createTime?: string;
    id?: number;
    itemContent?: string;
    itemName?: string;
    itemType?: number;
    itemTypeContent?: string;
    textColor?: string;
    updateTime?: string;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type MapLongItem_ = true;

  type NodeRelCtiVo = {
    relatedCti?: CtiVo[];
  };

  type NoRoleUserVo = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageCtiVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CtiVo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageItemVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ItemVo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRelationTypeVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: RelationTypeVo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    offset?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type RelationAddRequest = {
    ctiId?: number;
    endCtiEntityId?: number;
    relationTypeId?: number;
    startCtiEntityId?: number;
  };

  type RelationTypeQueryRequest = {
    current?: number;
    /** 尾节点ItemId */
    endItemId?: number;
    /** 尾节点名称 */
    endItemName?: string;
    /** 尾节点类型 */
    endItemType?: number;
    offset?: number;
    pageSize?: number;
    /** 实体之间的关系名称 */
    relationName?: string;
    sortField?: string;
    sortOrder?: string;
    /** 头节点Item的id */
    startItemId?: number;
    /** 头节点Item名称 */
    startItemName?: string;
    /** 头节点Item类型 */
    startItemType?: number;
  };

  type RelationTypeUpdateRequest = {
    /** 尾节点ItemId */
    endItemId?: number;
    /** relationTypeId */
    id?: number;
    /** 实体之间的关系名称 */
    relationName?: string;
    /** 头节点Item的id */
    startItemId?: number;
  };

  type RelationTypeVo = {
    /** 尾节点ItemId */
    endItemId?: number;
    /** 尾节点名称 */
    endItemName?: string;
    /** 尾节点类型 */
    endItemType?: number;
    /** 关系类型id */
    id?: number;
    /** 实体之间的关系名称 */
    relationName?: string;
    /** 头节点Item的id */
    startItemId?: number;
    /** 头节点Item名称 */
    startItemName?: string;
    /** 头节点Item类型 */
    startItemType?: number;
  };

  type RelationVo = {
    endFatherNode?: ItemVo;
    relationName?: string;
    startFatherNode?: ItemVo;
  };

  type TtpAddRequest = {
    articleLevelTtp?: string;
    ctiId?: number;
    sentLevelTtp?: string;
  };

  type TtpQueryRequest = {
    ctiId?: number;
  };

  type UniqueEntityIdQueryRequest = {
    ctiId?: number;
    entityName?: string;
    itemId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    offset?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
