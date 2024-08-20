export const pageStyles = `
    :where(.css-dev-only-do-not-override-r7v25l).ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #fff;
      text-shadow: 0 0 0.25px currentcolor;
    }


    :where(.css-dev-only-do-not-override-r7v25l).ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active, :where(.css-dev-only-do-not-override-r7v25l).ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
      border-bottom-color: #1890ff;
    }

    .ant-input-search :where(.css-dev-only-do-not-override-r7v25l).ant-input-group .ant-input-affix-wrapper:not(:last-child) {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
      border: 2px solid #1890ff;
    }

    :where(.css-dev-only-do-not-override-r7v25l).ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab, :where(.css-dev-only-do-not-override-r7v25l).ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab {
      border-radius: 8px 8px 0 0;
      border-left: 0;
    }

    :where(.css-dev-only-do-not-override-r7v25l).ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active, :where(.css-dev-only-do-not-override-r7v25l).ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active {
      color: #1890ff;
      background: #1890ff;
    }

    :where(.css-dev-only-do-not-override-r7v25l).ant-input-search >.ant-input-group >.ant-input-group-addon:last-child {
      inset-inline-start: -1px;
      padding: 0;
      border: 0;
      border: 1px solid #1890ff;
    }

    :where(.css-dev-only-do-not-override-r7v25l).ant-tabs-top > .ant-tabs-nav {
      margin: 0 0 0 0;
    }

    .search-left {
      margin-top: -39px;
    }


    .home-title h1, .home-title h2 {
      display: inline-block;
    }

    .home-title h2 {
      margin-left: 16px;
    }

    @media (max-width: 992px) {
      .home-title {
        margin-bottom: 64px;
      }
    }

    .custom-title {
      font-size: 48px;
      font-weight: bold;
      letter-spacing: 4px;
    }

    .ant-pro-layout .ant-pro-layout-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: transparent;
      position: relative;
      padding-block: 32px;
      padding-inline: 40px;
    }

`;
