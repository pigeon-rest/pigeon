export default defineAppConfig({
  ui: {
    colors: {
      neutral: 'zinc',
      success: 'emerald',
      error: 'rose'
    },
    button: {
      variants: {
        size: {
          md: {
            leadingIcon: 'size-4',
            trailingIcon: 'size-4'
          }
        }
      }
    },
    prose: {
      p: {
        base: 'leading-normal my-2.5 [&:first-child]:mt-0 [&:last-child]:mb-0'
      },
      code: {
        base: 'text-xs py-px px-1'
      },
      ul: {
        base: 'list-disc ps-3 my-2.5 [&:first-child]:mt-0 [&:last-child]:mb-0 marker:text-(--ui-border-accented)'
      },
      li: {
        base: 'my-1.5 ps-1.5 leading-normal [&:first-child]:mt-0 [&:last-child]:mb-0 [&>ul]:my-0'
      }
    },
    tabs: {
      slots: {
        list: 'px-6',
        content: '-mt-[7px]'
      }
    },
    select: {
      variants: {
        size: {
          md: {
            leadingIcon: 'size-4',
            trailingIcon: 'size-4'
          }
        }
      }
    },
    icons: {
      arrowDown: 'i-ph-arrow-down',
      arrowLeft: 'i-ph-arrow-left',
      arrowRight: 'i-ph-arrow-right',
      arrowUp: 'i-ph-arrow-up',
      caution: 'i-ph-warning-circle',
      check: 'i-ph-check',
      chevronDoubleLeft: 'i-ph-caret-double-left',
      chevronDoubleRight: 'i-ph-caret-double-right',
      chevronDown: 'i-ph-caret-down',
      chevronLeft: 'i-ph-caret-left',
      chevronRight: 'i-ph-caret-right',
      chevronUp: 'i-ph-caret-up',
      close: 'i-ph-x',
      copy: 'i-ph-copy',
      copyCheck: 'i-ph-check-circle',
      dark: 'i-ph-moon',
      drag: 'i-ph-dots-six-vertical',
      ellipsis: 'i-ph-dots-three',
      error: 'i-ph-x-circle',
      external: 'i-ph-arrow-up-right',
      eye: 'i-ph-eye',
      eyeOff: 'i-ph-eye-slash',
      file: 'i-ph-file',
      folder: 'i-ph-folder',
      folderOpen: 'i-ph-folder-open',
      hash: 'i-ph-hash',
      info: 'i-ph-info',
      light: 'i-ph-sun',
      loading: 'i-ph-circle-notch',
      menu: 'i-ph-list',
      minus: 'i-ph-minus',
      panelClose: 'i-ph-caret-left',
      panelOpen: 'i-ph-caret-right',
      plus: 'i-ph-plus',
      reload: 'i-ph-arrow-counter-clockwise',
      search: 'i-ph-magnifying-glass',
      stop: 'i-ph-square',
      success: 'i-ph-check-circle',
      system: 'i-ph-monitor',
      tip: 'i-ph-lightbulb',
      upload: 'i-ph-upload',
      warning: 'i-ph-warning'
    }
  }
})
