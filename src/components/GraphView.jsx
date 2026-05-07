import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import AlbumNode from "./AlbumNode";
import { buildAlbumNodes, buildAlbumEdges } from "../utils/graphUtils";

const nodeTypes = {
  album: AlbumNode,
};

function GraphView( {albums} ) {
  const nodes = buildAlbumNodes(albums);
  const edges = buildAlbumEdges(albums);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default GraphView;