// Client half of dsh-model-provider-badge.
//
// The Web client loads this file as a lazy module whose id is the package name.
// `require('react')` resolves from the page's shared module table, so this
// package must not bundle its own copy of React.
window.__ModuleLoader__.load({
  id: 'dsh-model-provider-badge',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    // The provider name is secondary information: muted text in a hairline pill
    // so it reads as metadata next to the model name, in both themes. Sizes are
    // relative to the trigger's own font, so the badge scales with the UI.
    const badgeStyle = {
      display: 'inline-block',
      padding: '0 4px',
      border: '1px solid var(--dsw-alias-border-l1)',
      borderRadius: 4,
      background: 'var(--dsw-alias-bg-layer-2)',
      color: 'var(--dsw-alias-label-secondary)',
      fontSize: '0.85em',
      lineHeight: 1.5,
      whiteSpace: 'nowrap',
      verticalAlign: 'baseline',
    }

    // Slots are inline in a flex row of their own; `baseline` keeps the pill and
    // the model name sitting on the same text baseline instead of centering.
    const rowStyle = { display: 'inline-flex', gap: 4, alignItems: 'baseline' }

    /**
     * Replacement for the composer's built-in model label.
     *
     * Contract from the owning slot: a contribution replaces the whole label,
     * including the model's own catalog badge. That is why the model name is
     * rendered here — returning only a provider pill would erase the name.
     *
     * `placement` distinguishes the three call sites:
     * - `trigger`: the composer button (the place this plugin exists for);
     * - `menu`: the dropdown's current-value row, already next to the
     *   provider-grouped list;
     * - `option`: one model row, already under its provider heading.
     * The last two keep the plain name to avoid repeating the route twice on one
     * screen.
     *
     * Props are read-only data (`provider.id`, `provider.name`, `model.id`,
     * `model.name`); the owner keeps click, focus, search and aria handling.
     */
    function ModelProviderLabel({ provider, model, placement }) {
      const name = h('span', null, model.name)
      if (placement !== 'trigger') return name
      return h(
        'span',
        { style: rowStyle },
        h('span', { style: badgeStyle, title: provider.name }, provider.name),
        name,
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        // The registration lives and dies with the contribution plugin: `inject`
        // re-runs it whenever the slot is declared again (for example after a
        // client reload), and the returned disposer removes it on unload.
        ctx.slots.inject('conversation.input.model.label', () => ctx.slots.register(
          { name: 'conversation.input.model.label' },
          ModelProviderLabel,
        ))
      },
    }
  },
})
