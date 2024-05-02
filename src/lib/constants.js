
export const platforms = [
    { label: "微信公众号", value: "wechat" },
    { label: "掘金社区", value: "juejin" },
    { label: "知乎", value: "zhihu" },
    { label: "Medium", value: "medium" },
  ]
  
export const worktypes = [
    { label: "根据昵称采集", value: "by_author" },
    { label: "根据关键字采集", value: "by_keyword" },
]

export const getPlatformLabel = function(value){
    return platforms.find((plat) => plat.value === value)?.label
}

export const getWorkTypesLabel = function(value) {
    return worktypes.find((workType) => workType.value == value)?.label
}
  