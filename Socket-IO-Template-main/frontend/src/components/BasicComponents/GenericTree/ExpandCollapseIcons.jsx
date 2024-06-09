import { first, isEmpty } from 'lodash';
import React from 'react';

const ExpandCollapseIcons = ({
  treeDataFormat, isCollapsable, isExpandable, setIsCollapsable, setIsExpandable, setExpandedNodes,
}) => (
  <div className="expandCollapse">
    {
      isCollapsable ? (
        <div
          role="button"
          tabIndex="0"
          className="expandCollapseIcons"
          onClick={async () => {
            setIsCollapsable(false);
            setIsExpandable(true);
            setExpandedNodes([]);
          }}
        >
          {/* <IconListBullets size="lg" /> */}
          Collapse
        </div>
      ) : ''
    }
    {
      isExpandable ? (
        <div
          role="button"
          tabIndex="0"
          className="expandCollapseIcons"
          onClick={async () => {
            setIsCollapsable(true);
            setIsExpandable(false);
            const updatedExpandedNodes = [];
            const expandedNodesQueue = [];
            for (let index = 0; index < treeDataFormat.length; index += 1) {
              updatedExpandedNodes.push(treeDataFormat[index].id);
              expandedNodesQueue.push(treeDataFormat[index]);
            }
            while (!isEmpty(expandedNodesQueue)) {
              if (expandedNodesQueue[0].children) {
                for (let index = 0; index < expandedNodesQueue[0].children.length; index += 1) {
                  const node = first(expandedNodesQueue).children[index];
                  updatedExpandedNodes.push(node.id);
                  expandedNodesQueue.push(node);
                }
              }
              expandedNodesQueue.splice(0, 1);
            }
            setExpandedNodes(updatedExpandedNodes);
          }}
        >
          {/* <IconHierarchyFlow size="lg" /> */}
          Expand
        </div>
      ) : ''
    }
  </div>
);

export default ExpandCollapseIcons;
