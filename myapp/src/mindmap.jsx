import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

// Standard NotebookLM Source Hierarchy from chunked university data
const sourceData = {
  name: "Infocomm Technology (ICT) & AI Landscape",
  type: "root",
  children: [
    {
      name: "SUTD (Design & AI)",
      type: "source-doc",
      children: [
        { name: "Freshmore Foundations (Terms 1-3)", type: "section" },
        {
          name: "Design & AI (DAI) Programme",
          type: "section",
          children: [
            { name: "AI Applications in Design", type: "chunk" },
            { name: "Human-Centred Intelligence Track", type: "chunk" },
            { name: "Societal and Systems Intelligence", type: "chunk" }
          ]
        },
        {
          name: "Computer Science (CSD) Pillars",
          type: "section",
          children: [
            { name: "Software Engineering Stream", type: "chunk" },
            { name: "Data Analytics Stream", type: "chunk" },
            { name: "Cybersecurity Stream", type: "chunk" }
          ]
        }
      ]
    },
    {
      name: "SIT (Applied Computing)",
      type: "source-doc",
      children: [
        { name: "8-12 Month Extended IWSP Pipeline", type: "section" },
        { name: "B.Sc. Applied Artificial Intelligence", type: "section" },
        { name: "B.Sc. Applied Computing (FinTech)", type: "section" },
        { name: "B.Eng. ICT (Information Security)", type: "section" }
      ]
    },
    {
      name: "SUSS (Social & Lifelong Learning)",
      type: "source-doc",
      children: [
        { name: "SUSS Core Modules (60 CU Component)", type: "section" },
        { name: "B.Sc. ICT Compulsory Core (90 CU)", type: "section" },
        {
          name: "Professional Cert Electives",
          type: "section",
          children: [
            { name: "AWS Developer / SysOps / ML", type: "chunk" },
            { name: "Red Hat System Administration", type: "chunk" },
            { name: "Oracle Certified Associate", type: "chunk" }
          ]
        }
      ]
    },
    {
      name: "IMDA / SSG National Framework",
      type: "source-doc",
      children: [
        {
          name: "Data and Artificial Intelligence Track",
          type: "section",
          children: [
            { name: "Business Intelligence Specialist", type: "chunk" },
            { name: "Data Engineer / Architect", type: "chunk" },
            { name: "ML Engineer / AI Research Scientist", type: "chunk" }
          ]
        },
        {
          name: "Software and Applications Track",
          type: "section",
          children: [
            { name: "Full-Stack Software Developer", type: "chunk" },
            { name: "DevOps Pipeline Engineer", type: "chunk" },
            { name: "Software Architect", type: "chunk" }
          ]
        }
      ]
    }
  ]
};

export default function InteractiveMindMap() {
  const svgRef = useRef(null);
  const [hierarchyData, setHierarchyData] = useState(JSON.parse(JSON.stringify(sourceData)));
  const [expandedNodes, setExpandedNodes] = useState({});

  // Helper to toggle internal node state recursively
  const toggleNodeState = (root, targetName) => {
    if (root.name === targetName) {
      if (root.children) {
        root._children = root.children;
        root.children = null;
      } else {
        root.children = root._children;
        root._children = null;
      }
      return true;
    }
    if (root.children) {
      for (let child of root.children) {
        if (toggleNodeState(child, targetName)) return true;
      }
    }
    if (root._children) {
      for (let child of root._children) {
        if (toggleNodeState(child, targetName)) return true;
      }
    }
    return false;
  };

  const handleNodeToggle = (nodeName) => {
    setExpandedNodes(prev => ({ ...prev, [nodeName]: !prev[nodeName] }));
    const dataCopy = { ...hierarchyData };
    toggleNodeState(dataCopy, nodeName);
    setHierarchyData(dataCopy);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous elements
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth || 800;
    const height = svgRef.current.clientHeight || 600;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const mainGroup = svg.append("g");

    // Enable zooming and panning on canvas
    svg.call(d3.zoom()
      .scaleExtent([0.4, 2.5])
      .on("zoom", (event) => {
        mainGroup.attr("transform", event.transform);
      }));

    // Setup Layout Parameters matching standard UI patterns
    const treeLayout = d3.tree().nodeSize([40, 220]);
    const d3Root = d3.hierarchy(hierarchyData);
    
    treeLayout(d3Root);

    // Shift center alignment starting coordinate point
    mainGroup.attr("transform", `translate(${width * 0.15}, ${height / 2})`);

    // Render connection paths
    mainGroup.append("g")
      .attr("fill", "none")
      .attr("stroke", "#333333")
      .attr("stroke-width", "1.5px")
      .selectAll("path")
      .data(d3Root.links())
      .join("path")
      .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

    // Render interactive circular joints
    const node = mainGroup.append("g")
      .selectAll("g")
      .data(d3Root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (e, d) => handleNodeToggle(d.data.name));

    node.append("circle")
      .attr("r", d => d.depth === 0 ? 8 : 5.5)
      .attr("fill", d => {
        if (d.data.type === "root") return "#10b981"; // Notebook green
        if (d.data.type === "source-doc") return "#3b82f6";
        return d._children || d.children ? "#6366f1" : "#9ca3af";
      })
      .attr("stroke", "#111827")
      .attr("stroke-width", "1.5px");

    // Render metadata strings text mapping positions
    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children || d._children ? -12 : 12)
      .attr("text-anchor", d => d.children || d._children ? "end" : "start")
      .text(d => d.data.name)
      .attr("fill", "#f3f4f6")
      .style("font-size", "12px")
      .clone(true).lower()
      .attr("stroke", "#111827")
      .attr("stroke-width", "3px");

  }, [hierarchyData]);

  // Dynamic Recursive Sidebar Tree Renderer Component
  const renderSourceList = (node) => {
    const hasSubNodes = (node.children && node.children.length > 0) || (node._children && node._children.length > 0);
    const isExpanded = !!expandedNodes[node.name];

    return (
      <div key={node.name} style={{ marginLeft: "14px", borderLeft: "1px solid #2d3748", paddingLeft: "8px" }}>
        <div 
          onClick={() => hasSubNodes && handleNodeToggle(node.name)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5px 8px",
            cursor: hasSubNodes ? "pointer" : "default",
            borderRadius: "4px",
            backgroundColor: isExpanded ? "#1f2937" : "transparent",
            color: node.type === "source-doc" ? "#60a5fa" : "#e5e7eb",
            fontSize: "13px",
            userSelect: "none"
          }}
        >
          {hasSubNodes && (
            <span style={{ marginRight: "6px", fontSize: "10px" }}>{isExpanded ? "▼" : "▶"}</span>
          )}
          <span style={{ marginRight: "6px" }}>
            {node.type === "root" && "📁"}
            {node.type === "source-doc" && "📄"}
            {node.type === "section" && "🔖"}
            {node.type === "chunk" && "🔹"}
          </span>
          <span style={{ fontWeight: hasSubNodes ? "600" : "400" }}>{node.name}</span>
        </div>
        {isExpanded && node.children && node.children.map(child => renderSourceList(child))}
        {isExpanded && node._children && node._children.map(child => renderSourceList(child))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#111827", overflow: "hidden" }}>
      {/* LEFT SPLIT PANEL: NotebookLM Source Docs Explorer */}
      <div style={{
        width: "320px",
        height: "100%",
        borderRight: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#111827",
        zIndex: 5
      }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #1f2937" }}>
          <h2 style={{ color: "#10b981", margin: 0, fontSize: "16px", fontWeight: "700" }}>NotebookLM Explorer</h2>
          <p style={{ color: "#9ca3af", margin: "4px 0 0 0", fontSize: "11px" }}>Sources & Extract Channels Matrix</p>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 4px" }}>
          {renderSourceList(hierarchyData)}
        </div>
      </div>

      {/* RIGHT SPLIT PANEL: Dynamic Interactive Map Visualizer */}
      <div style={{ flex: 1, height: "100%", position: "relative" }}>
        <div style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          backgroundColor: "rgba(17, 24, 39, 0.85)",
          border: "1px solid #1f2937",
          padding: "10px 14px",
          borderRadius: "6px",
          color: "#9ca3af",
          fontSize: "11px",
          pointerEvents: "none"
        }}>
          <div>• Click joints or elements to focus branches</div>
          <div>• Click and drag viewport window canvas space to slide view</div>
        </div>
        <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}