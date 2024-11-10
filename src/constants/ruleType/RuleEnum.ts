export const RULE_TYPE_ENUM = {
  YARA_RULE: "yara",
  SNORT_RULE: "snort",
};

export const RULE_TYPE_INTEGER_ENUM = {
  YARA_RULE: 1,
  SNORT_RULE: 2,
};

export const RULE_LLM_RESULT_ENUM = {
  1: { color: "error", text: "还未请求LLM" },
  2: { color: "processing", text: "已经请求LLM" },
  3: { color: "success", text: "已经获取规则数据" },
};

export const RULE_FILE_RESULT_ENUM = {
  1: { color: "error", text: "还未生成规则文件" },
  2: { color: "success", text: "已经生成规则文件" },
};

export const RULE_REQUEST_TYPE_ENUM = {
  CREATE_RULE: 1,
  UPDATE_RULE: 2,
};
