# dsh-model-provider-badge

Show which provider route serves the model, right in the DeepSeek Harness
composer.

The composer normally shows only the model name. A model reached through a
subscription plan or a gateway then looks exactly like the vendor's own API —
`DeepSeek-V4.1-Flash` says nothing about whether it is DeepSeek direct, an
OpenCode Go plan, or a relay. This plugin puts the provider route next to the
name:

```
[opencode-go] DeepSeek-V4.1-Flash · High
```

## Install

Install `dsh-model-provider-badge` from the DSH plugin manager, or add it to the
profile manifest:

```jsonc
{
  "dependencies": { "dsh-model-provider-badge": "^0.1.0" },
  "dsh": { "profile": { "bundles": ["dsh-model-provider-badge"] } }
}
```

Then reload the Web page. The badge appears on the composer's model button; the
model dropdown and its rows keep their plain names.

## How it works

The plugin registers one contribution to the `conversation.input.model.label`
slot, which the composer calls for three placements:

| Placement | Where | Rendered |
|---|---|---|
| `trigger` | the composer's model button | `provider` pill + model name |
| `menu` | the dropdown's current-value row | model name only |
| `option` | one row of the model list | model name only |

The dropdown list is already grouped by provider, so repeating the route there
would only add noise.

The contribution is rendered on the client only: no network requests, no
credentials, no host-side behaviour. The empty host plugin exists solely so the
bundle can carry its client half.

## Compatibility

- DeepSeek Harness `>=0.2.1-rc.2 <0.3.0-0` (the version that introduced the
  model label slot).
- Web client only; nothing changes for headless or ACP sessions.

## Known limitation

A slot contribution replaces the built-in label entirely, so a model's catalog
badge (`model.badge`) is not drawn. Current routes such as `opencode-go` do not
ship badges, so this is not visible in practice.

## License

MIT
