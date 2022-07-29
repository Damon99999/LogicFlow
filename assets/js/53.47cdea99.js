(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{455:function(e,d,t){"use strict";t.r(d);var o=t(29),v=Object(o.a)({},(function(){var e=this,d=e.$createElement,t=e._self._c||d;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"从0-7升级到1-0"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#从0-7升级到1-0"}},[e._v("#")]),e._v(" 从0.7升级到1.0")]),e._v(" "),t("h3",{attrs:{id:"主题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#主题"}},[e._v("#")]),e._v(" 主题")]),e._v(" "),t("p",[e._v("logicflow采用的新的主题定义方式，支持直接将自定义的所有svg属性透传到节点上，相比原来的主题方式，提供了更完善的自定义配置。\n原来的"),t("code",[e._v("outlineHover")]),e._v(", "),t("code",[e._v("edgeAdjust")]),e._v("等改成新的主题方式，详细使用方式见"),t("RouterLink",{attrs:{to:"/release/api/themeApi.html"}},[e._v("主题 API")]),e._v("。")],1),e._v(" "),t("h3",{attrs:{id:"自定义节点和边"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义节点和边"}},[e._v("#")]),e._v(" 自定义节点和边")]),e._v(" "),t("ul",[t("li",[e._v("我们规范了自定义的方式，现在主题相关样式属性获取改成在自定义"),t("code",[e._v("view")]),e._v("中用"),t("code",[e._v("model.getNodeStyle()")]),e._v("或者"),t("code",[e._v("model.getEdgeStyle()")]),e._v("方法获取，不支持在"),t("code",[e._v("view")]),e._v("中通过"),t("code",[e._v("getAttributes()")]),e._v("获取。")]),e._v(" "),t("li",[e._v("自定义样式相关属性我们要求在"),t("code",[e._v("model")]),e._v("中重写获取样式相关的方法。如"),t("RouterLink",{attrs:{to:"/api/nodeModelApi.html#样式属性"}},[e._v("getNodeStyle")]),e._v(", "),t("RouterLink",{attrs:{to:"/api/edgeModelApi.html#样式属性"}},[e._v("getEdgeStyle")]),e._v("。")],1),e._v(" "),t("li",[e._v("自定义html节点内置了"),t("code",[e._v("shouldUpdate")]),e._v("判断，只有节点的properties的发生了变化，才会触发setHtml方法。")]),e._v(" "),t("li",[e._v("我们明确了属性的分类，对于宽、高这类影响连线计算的属性，我们定义为"),t("RouterLink",{attrs:{to:"/api/nodeModelApi.html#形状属性"}},[e._v("形状属性")]),e._v(", 形状属性只允许在"),t("code",[e._v("setAttributes")]),e._v("中定义。")],1)]),e._v(" "),t("h3",{attrs:{id:"lf实例api"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#lf实例api"}},[e._v("#")]),e._v(" lf实例API")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("getNodeModel")]),e._v(" -> "),t("code",[e._v("getNodeModelById")])]),e._v(" "),t("li",[t("code",[e._v("getNodeData")]),e._v(" -> "),t("code",[e._v("getNodeDataById")])]),e._v(" "),t("li",[t("code",[e._v("getEdge")]),e._v(" -> "),t("code",[e._v("getEdgeModelById")])]),e._v(" "),t("li",[t("code",[e._v("changeNodeId")]),e._v("在找不到id的时候，返回的是空字符串而不是"),t("code",[e._v("false")])]),e._v(" "),t("li",[t("code",[e._v("getEdgeModels")]),e._v("参数不支持传入id, 基于Id获取edgeModel请使用"),t("code",[e._v("getEdgeModelById")])]),e._v(" "),t("li",[t("code",[e._v("select")]),e._v(" -> "),t("code",[e._v("selectElementById")])]),e._v(" "),t("li",[t("code",[e._v("eventCenter")]),e._v(" -> "),t("code",[e._v("graphModel.eventCenter")])]),e._v(" "),t("li",[t("code",[e._v("removeEdge")]),e._v(" -> "),t("code",[e._v("deleteEdgeByNodeId")])])]),e._v(" "),t("h3",{attrs:{id:"graphmodel"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#graphmodel"}},[e._v("#")]),e._v(" graphModel")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("getNodeModel.transformMatrix")]),e._v(" -> "),t("code",[e._v("getNodeModel.transformModel")])]),e._v(" "),t("li",[t("code",[e._v("getNodeModel.setTextEditable()")]),e._v(" -> "),t("code",[e._v("getNodeModel.editText()")])]),e._v(" "),t("li",[t("code",[e._v("getNodeModel.editConfig")]),e._v(" -> "),t("code",[e._v("getNodeModel.editConfigModel")])]),e._v(" "),t("li",[t("code",[e._v("graphModel.setElementTextById()")]),e._v(" -> "),t("code",[e._v("graphModel.updateText()")])]),e._v(" "),t("li",[t("code",[e._v("graphModel.removeEdgeById()")]),e._v(" -> "),t("code",[e._v("graphModel.deleteEdgeById()")])]),e._v(" "),t("li",[t("code",[e._v("graphModel.removeEdgeBySource()")]),e._v(" -> "),t("code",[e._v("graphModel.deleteEdgeBySource()")])]),e._v(" "),t("li",[t("code",[e._v("graphModel.removeEdgeByTarget()")]),e._v(" -> "),t("code",[e._v("graphModel.deleteEdgeByTarget()")])])])])}),[],!1,null,null,null);d.default=v.exports}}]);