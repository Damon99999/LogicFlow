import { h, Component } from 'preact';
import { assign } from 'lodash-es';
import Arrow from './Arrow';
import BaseEdgeModel from '../../model/edge/BaseEdgeModel';
import GraphModel from '../../model/GraphModel';
import LineText from '../text/LineText';
import { ElementState, EventType, ModelType } from '../../constant/constant';
import EventEmitter from '../../event/eventEmitter';
import { ArrowInfo, IEdgeState } from '../../type/index';
import { PolylineEdgeModel } from '../..';
import { getClosestPointOfPolyline } from '../../util/edge';

type IProps = {
  model: BaseEdgeModel;
  graphModel: GraphModel;
  eventCenter: EventEmitter;
};

export default class BaseEdge extends Component<IProps> {
  startTime: number;
  preStartTime: number;
  contextMenuTime: number;
  clickTimer: number;
  getAttributes() {
    const {
      model: {
        strokeWidth,
        strokeOpacity,
        strokeDashArray,
        isSelected,
        isHovered,
        hoverStroke,
        selectedStroke,
        properties,
      },
    } = this.props;
    let {
      model: {
        stroke,
      },
    } = this.props;

    if (isHovered) {
      stroke = hoverStroke;
    } else if (isSelected) {
      stroke = selectedStroke;
    }
    return {
      stroke,
      strokeWidth,
      strokeOpacity,
      strokeDashArray,
      isSelected,
      isHovered,
      hoverStroke,
      selectedStroke,
      properties: {
        ...properties,
      },
    };
  }
  getShape() { }
  getTextStyle() {
  }
  getText() {
    const { model, graphModel } = this.props;
    // 文本被编辑的时候，显示编辑框，不显示文本。
    if (model.state === ElementState.TEXT_EDIT) {
      return '';
    }
    const { edgeText } = graphModel.theme;
    const custome = this.getTextStyle();
    const style = assign({}, edgeText, custome);
    let draggable = false;
    const { editConfig } = graphModel;
    if (model.text.draggable || editConfig.edgeTextDraggable) {
      draggable = true;
    }
    return (
      <LineText
        editable={editConfig.edgeTextEdit && model.text.editable}
        model={model}
        graphModel={graphModel}
        style={style}
        draggable={draggable}
      />
    );
  }
  getArrowInfo(): ArrowInfo {
    const { model } = this.props;
    const {
      startPoint, endPoint, isSelected,
    } = model;
    const { hover } = this.state as IEdgeState;
    return {
      start: startPoint,
      end: endPoint,
      hover,
      isSelected,
    };
  }
  getArrowStyle() {
    const { stroke } = this.getAttributes();
    const { graphModel } = this.props;
    const { offset, verticalLength } = graphModel.theme.arrow;
    return {
      stroke,
      strokeWidth: 1,
      fill: stroke,
      offset,
      verticalLength,
    };
  }
  getArrow() {
    const arrowInfo = this.getArrowInfo();
    const { start, end } = arrowInfo;
    // 起终点缺失，或者重合不渲染箭头
    if ((!start || !end) || (start.x === end.x && start.y === end.y)) {
      return;
    }
    const style = this.getArrowStyle();
    return (
      <Arrow arrowInfo={arrowInfo} style={style} />
    );
  }
  getAppendWidth() {
    return <g />;
  }
  getAppend() {
    return (
      <g
        className="lf-edge-append"
      >
        {this.getAppendWidth()}
      </g>
    );
  }
  handleHover = (hovered, ev) => {
    const { model, eventCenter } = this.props;
    model.setHovered(hovered);
    const eventName = hovered ? EventType.EDGE_MOUSEENTER : EventType.EDGE_MOUSELEAVE;
    const nodeData = model.getData();
    eventCenter.emit(eventName, {
      data: nodeData,
      e: ev,
    });
  };
  setHoverON = (ev) => {
    this.handleHover(true, ev);
  };
  setHoverOFF = (ev) => {
    this.handleHover(false, ev);
  };
  // 右键点击节点，设置节点未现在菜单状态
  handleContextMenu = (ev: MouseEvent) => {
    ev.preventDefault();
    // 节点右击也会触发时间，区分右击和点击(mouseup)
    this.contextMenuTime = new Date().getTime();
    if (this.clickTimer) { clearTimeout(this.clickTimer); }
    const { model, graphModel, eventCenter } = this.props;
    const position = graphModel.getPointByClient({
      x: ev.clientX,
      y: ev.clientY,
    });
    graphModel.setElementStateById(model.id, ElementState.SHOW_MENU, position.domOverlayPosition);
    graphModel.toFront(model.id);
    graphModel.selectEdgeById(model.id);
    // 边数据
    const edgeData = model?.getData();
    eventCenter.emit(EventType.EDGE_CONTEXTMENU, {
      data: edgeData,
      e: ev,
      position,
    });
  };
  handleMouseDown = (e) => {
    e.stopPropagation();
    this.startTime = new Date().getTime();
  };
  // todo: 去掉setTimeout
  handleMouseUp = (e: MouseEvent) => {
    if (!this.startTime) return;
    const time = new Date().getTime() - this.startTime;
    if (time > 200) return; // 事件大于200ms，认为是拖拽。
    const { model, graphModel, eventCenter } = this.props;
    const edgeData = model?.getData();
    const position = graphModel.getPointByClient({
      x: e.clientX,
      y: e.clientY,
    });
    if (this.preStartTime && this.startTime - this.preStartTime < 200) {
      if (this.clickTimer) { window.clearTimeout(this.clickTimer); }
      const { editConfig, textEditElement } = graphModel;
      // 当前连线正在编辑，需要先重置状态才能变更文本框位置
      if (textEditElement && textEditElement.id === model.id) {
        graphModel.setElementStateById(model.id, ElementState.DEFAULT);
      }
      // 边文案可编辑状态，才可以进行文案编辑
      if (editConfig.edgeTextEdit && model.text.editable) {
        graphModel.setElementStateById(model.id, ElementState.TEXT_EDIT);
      }
      if (model.modelType === ModelType.POLYLINE_EDGE) {
        const polylineEdgeModel = model as PolylineEdgeModel;
        const { canvasOverlayPosition: { x, y } } = graphModel.getPointByClient({ x: e.x, y: e.y });
        const crossPoint = getClosestPointOfPolyline({ x, y }, polylineEdgeModel.points);
        polylineEdgeModel.dbClickPosition = crossPoint;
      }
      eventCenter.emit(EventType.EDGE_DBCLICK, {
        data: edgeData,
        e,
        position,
      });
    } else {
      this.clickTimer = window.setTimeout(() => {
        // 边右击也会触发mouseup事件，判断是否有右击，如果有右击则取消点击事件触发
        if (!this.contextMenuTime || this.startTime > this.contextMenuTime) {
          // 边数据
          eventCenter.emit(EventType.ELEMENT_CLICK, {
            data: edgeData,
            e,
            position,
          });
          eventCenter.emit(EventType.EDGE_CLICK, {
            data: edgeData,
            e,
            position,
          });
        }
      }, 400);
    }
    graphModel.toFront(model.id);
    const { editConfig: { metaKeyMultipleSelected } } = graphModel;
    graphModel.selectEdgeById(model.id, e.metaKey && metaKeyMultipleSelected);
    this.preStartTime = this.startTime;
  };

  render() {
    const { model } = this.props;
    return (
      <g
        className="lf-edge"
        id={model.id}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onContextMenu={this.handleContextMenu}
        onMouseOver={this.setHoverON}
        onMouseEnter={this.setHoverON}
        onMouseLeave={this.setHoverOFF}
      >
        {this.getShape()}
        {this.getAppend()}
        {this.getText()}
        {this.getArrow()}
      </g>
    );
  }
}
