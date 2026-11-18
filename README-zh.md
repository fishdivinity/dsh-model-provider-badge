# dsh-model-provider-badge

在 DeepSeek Harness 的输入框里显示模型实际走的供应商路由。

输入框默认只显示模型名。当模型经由订阅套餐或中转网关提供时，`DeepSeek-V4.1-Flash`
看起来和厂商官方 API 完全一样——单看名字分不清是 DeepSeek 直连、OpenCode Go 套餐还是
中转站。这个插件把路由名放进标签：

```
[opencode-go] DeepSeek-V4.1-Flash · High
```

## 安装

在 DSH 的插件管理器里安装 `dsh-model-provider-badge`，或写入 profile 清单：

```jsonc
{
  "dependencies": { "dsh-model-provider-badge": "^0.1.0" },
  "dsh": { "profile": { "bundles": ["dsh-model-provider-badge"] } }
}
```

然后刷新 Web 页面。角标出现在输入框的模型按钮上；下拉面板和模型列表保持原名。

## 实现

插件只向 `conversation.input.model.label` slot 注册一个贡献，该 slot 有三个调用位置：

| 位置 | 场景 | 显示 |
|---|---|---|
| `trigger` | 输入框的模型按钮 | 供应商角标 + 模型名 |
| `menu` | 下拉面板的当前值行 | 仅模型名 |
| `option` | 模型列表的一行 | 仅模型名 |

模型列表本身已按供应商分组，在列表里重复路由名只会增加噪音。

贡献只在客户端渲染：不发起网络请求、不读取凭据、没有宿主侧行为。宿主插件为空壳，作用仅
是让 bundle 能携带它的客户端部分。

## 兼容性

- DeepSeek Harness `>=0.2.1-rc.2 <0.3.0-0`（引入模型标签 slot 的版本）。
- 仅 Web 客户端；headless 与 ACP 会话不受影响。

## 已知取舍

slot 的贡献会整体替换内置标签，因此模型自带的目录角标（`model.badge`）不再显示。当前
`opencode-go` 这类路由的模型没有角标，实际不可见。

## 许可证

MIT
