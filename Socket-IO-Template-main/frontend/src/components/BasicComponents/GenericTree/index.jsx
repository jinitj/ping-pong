/* eslint-disable no-await-in-loop */

import React, { useEffect, useState } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import IconHover from '../IconHover';
import { updateTreeData } from './utils';
import { onClick, onNodeSelectionChange } from './treeActions';
import ExpandCollapseIcons from './ExpandCollapseIcons';

import './GenericTree.css';

FileExplorerTheme.rowHeight = 24;

function GenericTree(props) {
  const [treeDataFormat, setTreeDataFormat] = useState(undefined);
  const [selectedIds, setSelectedIds] = useState(props.selectedIds);
  const [leafSelectedIds, setLeafSelectedIds] = useState([]);

  const [isExpandable, setIsExpandable] = useState(true);
  const [isCollapsable, setIsCollapsable] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState([]);

  useEffect(() => {
    (async () => {
      const [updatedTreeData, subTreeLeafSelectedIds, selectedId] = await updateTreeData(
        selectedIds,
        props.disabledIds,
        props.editMode,
        setSelectedIds,
        expandedNodes,
        props.treeData,
      );
      setLeafSelectedIds([...subTreeLeafSelectedIds]);
      setTreeDataFormat(updatedTreeData);
      setSelectedIds(selectedId);
    })();
  }, [props.treeData, props.disabledIds, expandedNodes, selectedIds]);

  if (!treeDataFormat) {
    return 'Loading';
  }

  return (
    <div className="treeComponent" style={props.style}>
      {props.editMode && <button onClick={() => { props.updateSelectedIds(leafSelectedIds); }}>Update Visibilities</button>}
      {
        props.showExpandCollapse ? (
          <ExpandCollapseIcons
            treeDataFormat={treeDataFormat}
            isCollapsable={isCollapsable}
            isExpandable={isExpandable}
            setIsCollapsable={setIsCollapsable}
            setIsExpandable={setIsExpandable}
            setExpandedNodes={setExpandedNodes}
          />
        ) : null
      }
      <SortableTree
        theme={FileExplorerTheme}
        treeData={treeDataFormat}
        onChange={() => {}}
        getNodeKey={({ node }) => node.id}
        canDrag={false}
        className="rst__tree"
        isVirtualized={false}
        generateNodeProps={
          ({ node }) => ({
            buttons: props.editMode
              ? [
                <IconHover action="add" onAction={() => { props.onAdd(node) }} />,
                <IconHover action="remove" onAction={() => { props.onRemove(node) }} />,
              ]
              : [],
            onClick: (e) => {
              const clickedItemClassName = e.target.className;
              onClick(clickedItemClassName, node, expandedNodes, setIsExpandable, setIsCollapsable, setExpandedNodes, props.onNodeClick);
            },
            title: (
              (props.allowMultiple || !node.children) && props.selectionMode
                ? (
                  <>
                    <input
                      type="checkbox"
                      className="margin_6px"
                      disabled={node.disableType}
                      checked={node.selectionType === 1}
                      indeterminate={node.selectionType === 0.5}
                      onChange={() => onNodeSelectionChange(node, selectedIds, treeDataFormat, setSelectedIds, props.allowMultiple)}
                    />
                    <span className="checkbox-node-title">
                      {props.selectedNodeId === node.id ? <b>{node.label}</b> : node.label}
                    </span>
                  </>
                ) : <div className="node-title">{props.selectedNodeId === node.id ? <b>{node.label}</b> : node.label}</div>
            ),
          })
        }
      />
    </div>
  );
}

export default GenericTree;
