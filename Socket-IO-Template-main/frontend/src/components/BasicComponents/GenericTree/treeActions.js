import { first, isEmpty } from 'lodash';
import { getAncestorsNodeIds } from './utils';

const onClick = (clickedItemClassName, node, expandedNodes, setIsExpandable, setIsCollapsable, setExpandedNodes, onNodeClick) => {
  if (clickedItemClassName === 'rstcustom__expandButton') {
    setIsExpandable(true);
    setIsCollapsable(true);
    expandedNodes.push(node.id);
    setExpandedNodes([...expandedNodes]);
  } else if (clickedItemClassName === 'rstcustom__collapseButton') {
    setIsExpandable(true);
    setIsCollapsable(true);
    const expandedNodeIndex = expandedNodes.indexOf(node.id);
    const expandedNodesLength = expandedNodes.length;
    setExpandedNodes([
      ...expandedNodes.slice(0, expandedNodeIndex),
      ...expandedNodes.slice(expandedNodeIndex + 1, expandedNodesLength),
    ]);
  } else {
    onNodeClick(node);
  }
};

const onNodeSelectionChange = (node, selectedIds, treeDataFormat, setSelectedIds, allowMultiple) => {
  if (node.selectionType < 1) {
    if (allowMultiple) {
      setSelectedIds([...selectedIds, node.id]);
    } else {
      setSelectedIds([node.id]);
    }
  } else {
    const nodesToBeDeselected = [node];
    const updatedSelectedIds = [...selectedIds];
    while (!isEmpty(nodesToBeDeselected)) {
      const nodeToBeDeselected = first(nodesToBeDeselected);
      if (nodeToBeDeselected.children && !isEmpty(nodeToBeDeselected.children)) {
        nodeToBeDeselected.children.forEach((childNodeToBeDeselected) => {
          nodesToBeDeselected.push(childNodeToBeDeselected);
        });
      }
      const nodeToBeDeselectedIndex = updatedSelectedIds.indexOf(nodeToBeDeselected.id);
      updatedSelectedIds.splice(nodeToBeDeselectedIndex, 1);

      nodesToBeDeselected.splice(0, 1);
    }
    const ancestorsNodeIds = getAncestorsNodeIds(treeDataFormat, node.id);
    if (ancestorsNodeIds) {
      ancestorsNodeIds.forEach((ancestorNodeId) => {
        if (updatedSelectedIds.includes(ancestorNodeId)) {
          const nodeToBeDeselectedIndex = updatedSelectedIds.indexOf(ancestorNodeId);
          updatedSelectedIds.splice(nodeToBeDeselectedIndex, 1);
        }
      });
    }
    setSelectedIds([...updatedSelectedIds]);
  }
};

export {
  onClick,
  onNodeSelectionChange,
};
