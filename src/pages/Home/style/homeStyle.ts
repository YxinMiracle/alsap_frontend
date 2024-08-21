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

:where(.css-dev-only-do-not-override-r7v25l).ant-input-search > .ant-input-group > .ant-input-group-addon:last-child {
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

.static-card {
  margin-bottom: 16px
}

.static-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.static-card-icon span {
  font-size: 2rem;
}

.entity-col {
  height: 363px;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-bottom: 16px;
}

.entity-col .entity-card {
  height: 100%;
  width: 98%;
  margin: 0 auto;
  border-radius: 0;
  overflow-y: auto;
}

.entity-col .entity-card .entity-item {
  height: 120px;
  flex: 1 1 33.3%;
  min-width: 130px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 20px;
    border: 1px solid #f2eded; /* 添加一个浅灰色的边框 */
  border-radius: 5px; /* 轻微的圆角 */
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); /* 添加阴影 */

}

.entity-item-parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.entity-col .ant-card-body {
  padding: 0;
}

.entity-card::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

.entity-card::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #e0dfdf;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.entity-card::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
}

`;
