/* eslint-disable no-await-in-loop */
import { isEmpty } from 'lodash';

const updateTreeData = async (
  selectedIds = [],
  disabledIds = [],
  editMode,
  setSelectedIds,
  expandedNodes,
  subTreeData,
  subTreeLeafSelectedIds = [],
  parentSelected = false,
  parentDisabled = false,
) => {
  const updatedTreeData = [];
  let childrenSelectionStatus = 0;
  let childrenDisableStatus;
  for (let index = 0; index < subTreeData.length; index += 1) {
    const node = subTreeData[index];
    let updatedChildrenTreeData = node.children;
    let nodeSelectionStatus = 0;
    let nodeDisableStatus = false;
    if (node.children && !isEmpty(node.children)) {
      [updatedChildrenTreeData, subTreeLeafSelectedIds,, nodeSelectionStatus, nodeDisableStatus] = await updateTreeData(
        selectedIds,
        disabledIds,
        editMode,
        setSelectedIds,
        expandedNodes,
        node.children,
        subTreeLeafSelectedIds,
        parentSelected || selectedIds.includes(node.id),
        parentDisabled || disabledIds.includes(node.id),
      );
    }

    let selectionType;
    if (parentSelected || selectedIds.includes(node.id) || (nodeSelectionStatus === node.children?.length && node.children?.length)) {
      selectionType = 1;

      if (!selectedIds?.includes(node.id)) {
        selectedIds.push(node.id);
      }
      if (!subTreeLeafSelectedIds.includes(node.id) && (!node.children || isEmpty(node.children))) {
        subTreeLeafSelectedIds.push(node.id);
      }
    } else if (nodeSelectionStatus === 0) {
      selectionType = 0;
    } else {
      selectionType = 0.5;
    }
    childrenSelectionStatus += selectionType;

    const disableType = parentDisabled || disabledIds.includes(node.id) || nodeDisableStatus;
    if (childrenDisableStatus === undefined) {
      childrenDisableStatus = disableType;
    } else {
      childrenDisableStatus = childrenDisableStatus && disableType;
    }

    updatedTreeData.push({
      ...node,
      children: updatedChildrenTreeData,
      expanded: editMode || expandedNodes.includes(node.id),
      selectionType,
      disableType,
    });
  }

  return [
    updatedTreeData, subTreeLeafSelectedIds, selectedIds, childrenSelectionStatus, childrenDisableStatus,
  ];
};

const getAncestorsNodeIds = (subTree, nodeId) => {
  for (let index = 0; index < subTree.length; index += 1) {
    const node = subTree[index];
    if (node.id === nodeId) {
      return [node.id];
    }
    if (node.children && !isEmpty(node.children)) {
      const ancestorsNodeIds = getAncestorsNodeIds(node.children, nodeId);
      if (ancestorsNodeIds) {
        return [...ancestorsNodeIds, node.id];
      }
    }
  }

  return undefined;
};

export {
  updateTreeData,
  getAncestorsNodeIds,
};
