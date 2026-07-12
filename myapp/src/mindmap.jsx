import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

// FULL, COMPLETE SUB-BRANCH REPOSITORY FROM SOURCE CHUNKS
const initialRpData = {
  name: "Republic Polytechnic (RP) - School of Infocomm",
  type: "root",
  id: "rp_root",
  children: [
    {
      name: "Common ICT Programme (R58)",
      type: "source-doc",
      id: "rp_r58",
      children: [
        {
          name: "Year 1 Foundational Core Modules",
          type: "section",
          id: "rp_r58_s1",
          children: [
            { name: "C110 Programming Fundamentals I & C210 II", type: "chunk", id: "rp_r58_c1" },
            { name: "C112 Intro to Business Process & Automation", type: "chunk", id: "rp_r58_c2" },
            { name: "C206 Software Development Process", type: "chunk", id: "rp_r58_c3" },
            { name: "C207 Database Systems & C235 IT Security Management", type: "chunk", id: "rp_r58_c4" },
            { name: "C227 Operating Systems and Networking", type: "chunk", id: "rp_r58_c5" },
            { name: "E123 Mathematics for Computing", type: "chunk", id: "rp_r58_c6" }
          ]
        },
        {
          name: "O-Level Computing Exemption Pathway",
          type: "section",
          id: "rp_r58_s2",
          children: [
            { name: "Exempts 60-Hour Introductory Module upon enrollment", type: "chunk", id: "rp_r58_c7" },
            { name: "Saves hours for Certifications & Industry Projects", type: "chunk", id: "rp_r58_c8" }
          ]
        }
      ]
    },
    {
      name: "Diploma in Applied AI & Analytics (R13)",
      type: "source-doc",
      id: "rp_r13",
      children: [
        {
          name: "AI Core Execution Stack Modules",
          type: "section",
          id: "rp_r13_s1",
          children: [
            { name: "C230 Data Wrangling and Automation", type: "chunk", id: "rp_r13_c1" },
            { name: "C240 AI Essentials and Innovations", type: "chunk", id: "rp_r13_c2" },
            { name: "C245 Data Analytics with GenAI", type: "chunk", id: "rp_r13_c3" },
            { name: "C384 Deep Learning for Visual Intelligence", type: "chunk", id: "rp_r13_c4" },
            { name: "C387 ML for Predictive Analytics & C388 Applied LLMs", type: "chunk", id: "rp_r13_c5" },
            { name: "C389 AI Solution Design and Implementation", type: "chunk", id: "rp_r13_c6" }
          ]
        },
        {
          name: "Industry Tech Certifications",
          type: "section",
          id: "rp_r13_s2",
          children: [
            { name: "NVIDIA Deep Learning Institute Badges", type: "chunk", id: "rp_r13_c7" },
            { name: "KNIME, Workato, Google, AWS, IBM Systems", type: "chunk", id: "rp_r13_c8" }
          ]
        }
      ]
    },
    {
      name: "Diploma in Cybersecurity & Digital Forensics (R55)",
      type: "source-doc",
      id: "rp_r55",
      children: [
        {
          name: "Cyber Engineering Core Modules",
          type: "section",
          id: "rp_r55_s1",
          children: [
            { name: "C331 Digital Forensics and Malware Analysis", type: "chunk", id: "rp_r55_c1" },
            { name: "C335 Internetworking Security", type: "chunk", id: "rp_r55_c2" },
            { name: "C350 Secure Design of AI Systems", type: "chunk", id: "rp_r55_c3" },
            { name: "C374 Ethical Hacking & C377 Threat Hunting", type: "chunk", id: "rp_r55_c4" },
            { name: "C376 Governance, Risk, Compliance & Data Protection", type: "chunk", id: "rp_r55_c5" }
          ]
        },
        {
          name: "Specialized Defence Pathway",
          type: "section",
          id: "rp_r55_s2",
          children: [
            { name: "DIS-RP Cyber Work-Learn Scheme (SAF Track)", type: "chunk", id: "rp_r55_c6" },
            { name: "Target Certs: AISP QISP, CEH, Palo Alto PCNSA", type: "chunk", id: "rp_r55_c7" }
          ]
        }
      ]
    },
    {
      name: "Diploma in Enterprise Cloud Computing & Management (R12)",
      type: "source-doc",
      id: "rp_r12",
      children: [
        {
          name: "Cloud Infrastructure Modules",
          type: "section",
          id: "rp_r12_s1",
          children: [
            { name: "C270 DevOps Essentials & C320 Cloud Architecting", type: "chunk", id: "rp_r12_c1" },
            { name: "C322 Cloud Data Centre Management", type: "chunk", id: "rp_r12_c2" },
            { name: "C330 Linux Administration & Containerisation", type: "chunk", id: "rp_r12_c3" },
            { name: "C381 IT Service and AI Operations", type: "chunk", id: "rp_r12_c4" }
          ]
        },
        {
          name: "Accelerated Delivery Options",
          type: "section",
          id: "rp_r12_s2",
          children: [
            { name: "3.5-Year Fast Track (Diploma + Specialist Diploma)", type: "chunk", id: "rp_r12_c5" },
            { name: "Vendor Paths: AWS, Cisco, Red Hat, Oracle, ServiceNow", type: "chunk", id: "rp_r12_c6" }
          ]
        }
      ]
    },
    {
      name: "Diploma in Financial Technology (R18)",
      type: "source-doc",
      id: "rp_r18",
      children: [
        {
          name: "FinTech Regulatory Engineering Core",
          type: "section",
          id: "rp_r18_s1",
          children: [
            { name: "B231 Risk and Compliance & C368 Financial Ecosystems", type: "chunk", id: "rp_r18_c1" },
            { name: "C369 Financial Technologies & C372 Payment Tech", type: "chunk", id: "rp_r18_c2" },
            { name: "C373 Distributed Ledger Technology Solutioning", type: "chunk", id: "rp_r18_c3" }
          ]
        },
        {
          name: "Startup Incubation Track",
          type: "section",
          id: "rp_r18_s2",
          children: [
            { name: "Entrepreneurial Immersion Programme Track", type: "chunk", id: "rp_r18_c4" },
            { name: "Launch Corporate Proposals & Startup Incubation", type: "chunk", id: "rp_r18_c5" }
          ]
        }
      ]
    },
    {
      name: "Diploma in Information Technology (R47)",
      type: "source-doc",
      id: "rp_r47",
      children: [
        {
          name: "Specialized Major Paths",
          type: "section",
          id: "rp_r47_s1",
          children: [
            { name: "Full Stack Development Major (DevOps, Cloud/Mobile App)", type: "chunk", id: "rp_r47_c1" },
            { name: "IT Solutions Management Major (Project Mgmt, RPA)", type: "chunk", id: "rp_r47_c2" },
            { name: "Business Digitalisation Major (eCommerce, Business Strategy)", type: "chunk", id: "rp_r47_c3" }
          ]
        },
        {
          name: "Agile Software Methodologies",
          type: "section",
          id: "rp_r47_s2",
          children: [
            { name: "Agile Project Management, Scrum & QA Testing (C339)", type: "chunk", id: "rp_r47_c4" },
            { name: "C218 UI/UX Design for Apps & Design Principles", type: "chunk", id: "rp_r47_c5" }
          ]
        }
      ]
    }
  ]
};

const initialUniData = {
  name: "Autonomous Universities Further Education Pathways",
  type: "root",
  id: "uni_root",
  children: [
    {
      name: "NUS - School of Computing (SoC)",
      type: "source-doc",
      id: "uni_nus",
      children: [
        {
          name: "Undergraduate Program Suite",
          type: "section",
          id: "uni_nus_sec1",
          children: [
            { name: "Bachelor of Computing in Computer Science", type: "chunk", id: "nus_ug_cs" },
            { name: "Bachelor of Computing in Artificial Intelligence", type: "chunk", id: "nus_ug_ai" },
            { name: "Bachelor of Science in Business Analytics", type: "chunk", id: "nus_ug_ba" },
            { name: "Bachelor of Computing in Business Artificial Intelligence Systems (BAIS)", type: "chunk", id: "nus_ug_bais" },
            { name: "Bachelor of Engineering in Computer Engineering (CEG)", type: "chunk", id: "nus_ug_ceg" },
            { name: "Bachelor of Computing in Information Security", type: "chunk", id: "nus_ug_isc" },
            { name: "Geospatial Intelligence Specialty Track & C-Innovators Program", type: "chunk", id: "nus_ug_spec" }
          ]
        },
        {
          name: "Graduate & Research Degrees Suite",
          type: "section",
          id: "uni_nus_sec2",
          children: [
            { name: "PhD in Computer Science & PhD in Information Systems", type: "chunk", id: "nus_pg_phd" },
            { name: "Master of Computing (General Track & AI Track Specializations)", type: "chunk", id: "nus_pg_mcomp" },
            { name: "Master of Science in Digital FinTech & Business Analytics", type: "chunk", id: "nus_pg_msc" },
            { name: "Executive Master in AI & Digital Transformation", type: "chunk", id: "nus_pg_exec" }
          ]
        }
      ]
    },
    {
      name: "NTU - College of Computing and Data Science (CCDS)",
      type: "source-doc",
      id: "uni_ntu",
      children: [
        {
          name: "AISC Core & Specialized Curriculums",
          type: "section",
          id: "uni_ntu_sec1",
          children: [
            { name: "Bachelor of Computing (Hons) in Artificial Intelligence and Society (AISC)", type: "chunk", id: "ntu_ug_aisc" },
            { name: "AISC Focus: AI for Social Good (17 UN SDGs), Ethical AI (AI Verify), AI for Society", type: "chunk", id: "ntu_ug_aisc_core" },
            { name: "20-Week Industry Internship & Responsible AI Capstone Project", type: "chunk", id: "ntu_ug_aisc_ops" }
          ]
        },
        {
          name: "Core Technical & Joint Degree Suite",
          type: "section",
          id: "uni_ntu_sec2",
          children: [
            { name: "Bachelor of Computing (Hons) in Data Science & Artificial Intelligence (DSAI)", type: "chunk", id: "ntu_ug_dsai" },
            { name: "Bachelor of Engineering (Hons) in Computer Engineering (Fuses CS & Electronics)", type: "chunk", id: "ntu_ug_ceg" },
            { name: "Bachelor of Computing (Hons) in Computer Science & Turing Scholars Track", type: "chunk", id: "ntu_ug_cs" },
            { name: "Double Degrees: Computer Engineering & Economics / Business Analytics", type: "chunk", id: "ntu_ug_ddp" }
          ]
        }
      ]
    },
    {
      name: "SMU - School of Computing and Information Systems (SCIS)",
      type: "source-doc",
      id: "uni_smu",
      children: [
        {
          name: "Undergraduate Degree Pathways",
          type: "section",
          id: "uni_smu_sec1",
          children: [
            { name: "B.Sc (Information Systems) - Product Development Track", type: "chunk", id: "smu_ug_is" },
            { name: "B.Sc (Computer Science) - Software/AI Solutioning", type: "chunk", id: "smu_ug_cs" },
            { name: "B.Sc (Computing & Law) - Joint Core with SOL", type: "chunk", id: "smu_ug_cl" },
            { name: "B.Sc (Software Engineering) WSDeg (52-Week GovTech/NCS Apprenticeship)", type: "chunk", id: "smu_ug_se" }
          ]
        },
        {
          name: "Postgraduate Professional Education",
          type: "section",
          id: "uni_smu_sec2",
          children: [
            { name: "Master of IT in Business (MITB) - Analytics/FinTech/Cybersecurity tracks", type: "chunk", id: "smu_pg_mitb" },
            { name: "Doctor of Engineering (EngD), Tech DBA (Fudan Joint), PhD Suites", type: "chunk", id: "smu_pg_doc" }
          ]
        }
      ]
    },
    {
      name: "SUTD - Design and Artificial Intelligence (DAI) & CSD",
      type: "source-doc",
      id: "uni_sutd",
      children: [
        {
          name: "Freshmore & DAI Specialties",
          type: "section",
          id: "uni_sutd_sec1",
          children: [
            { name: "Terms 1-3 Grade-Free (Pass/No Record) with E or S options", type: "chunk", id: "sutd_ug_fresh" },
            { name: "Bachelor of Science in Design and Artificial Intelligence (DAI)", type: "chunk", id: "sutd_ug_dai" },
            { name: "DAI Tracks: Societal & Systems Intelligence / Human-Centred Intelligence", type: "chunk", id: "sutd_ug_dai_tracks" }
          ]
        },
        {
          name: "Computer Science and Design (CSD)",
          type: "section",
          id: "uni_sutd_sec2",
          children: [
            { name: "Bachelor of Engineering in Computer Science and Design (CSD)", type: "chunk", id: "sutd_ug_csd" },
            { name: "CSD Tracks: Software Eng, Data Analytics, AI, Security, FinTech, IoT", type: "chunk", id: "sutd_ug_csd_tracks" }
          ]
        }
      ]
    },
    {
      name: "SIT - Infocomm Technology Cluster",
      type: "source-doc",
      id: "uni_sit",
      children: [
        {
          name: "Core Direct Honours Applied Degrees",
          type: "section",
          id: "uni_sit_sec1",
          children: [
            { name: "B.Sc (Hons) Applied Artificial Intelligence (AAI)", type: "chunk", id: "sit_ug_aai" },
            { name: "B.Sc (Hons) Applied Computing (FinTech) - co-developed with IMDA/MAS", type: "chunk", id: "sit_ug_ftc" },
            { name: "B.Eng (Hons) ICT Information Security - Cyber Defense focus", type: "chunk", id: "sit_ug_isc" },
            { name: "B.Sc (Hons) Computing Science - joint degree with University of Glasgow", type: "chunk", id: "sit_ug_csc" },
            { name: "B.Eng (Hons) Computer Engineering - Low-level OS/Firmware design", type: "chunk", id: "sit_ug_ce" },
            { name: "B.Sc (Hons) Hospitality and Tourism Management and Artificial Intelligence", type: "chunk", id: "sit_ug_htm" }
          ]
        },
        {
          name: "DigiPen Institute Technical Tracks",
          type: "section",
          id: "uni_sit_sec2",
          children: [
            { name: "B.Sc (Hons) CS in Real-Time Interactive Simulation (RTIS)", type: "chunk", id: "sit_ug_rtis" },
            { name: "B.Sc (Hons) CS in Interactive Media and Game Development", type: "chunk", id: "sit_ug_imgd" },
            { name: "BFA (Hons) Digital Art and Animation & B.Sc UX Game Design", type: "chunk", id: "sit_ug_faa" }
          ]
        }
      ]
    },
    {
      name: "SUSS - School of Science and Technology",
      type: "source-doc",
      id: "uni_suss",
      children: [
        {
          name: "B.Sc in Information and Communication Technology",
          type: "section",
          id: "uni_suss_sec1",
          children: [
            { name: "200 Credit Graduation split (60 Core / 90 Compulsory / 10 Elective / 40 Minor)", type: "chunk", id: "suss_ug_ict" },
            { name: "Compulsory Core: Math for Data Science, ML Applications, Programming, DSA, Cloud", type: "chunk", id: "suss_ug_core" },
            { name: "Embedded Professional Certs: AWS Architect/Dev, Red Hat Admin, Oracle Certified", type: "chunk", id: "suss_ug_certs" }
          ]
        }
      ]
    }
  ]
};

const initialCareerData = {
  name: "National Framework & Tech Career Prospects",
  type: "root",
  id: "career_root",
  children: [
    {
      name: "Data & Artificial Intelligence Track (IMDA Skills Framework)",
      type: "source-doc",
      id: "career_data",
      children: [
        { name: "Business Intelligence: Data Analyst, Business Intelligence Manager, BI Director", type: "section", id: "career_data_s1" },
        { name: "Data Engineering: Data Engineer, Senior Data Engineer, Data Architect", type: "section", id: "career_data_s2" },
        { name: "Machine Learning Engineering: AI/ML Engineer, Senior ML Engineer, Head of Data Science and AI", type: "section", id: "career_data_s3" },
        { name: "AI Applied Research: AI Applied Researcher, Chief Data Officer / Chief AI Officer", type: "section", id: "career_data_s4" }
      ]
    },
    {
      name: "Software & Applications Track (IMDA Framework)",
      type: "source-doc",
      id: "career_soft",
      children: [
        { name: "Software Engineering Core: Associate Software Engineer, Software Engineer, Software Architect", type: "section", id: "career_soft_s1" },
        { name: "Advanced Architectures: DevOps Pipeline Engineer, Software Engineering Manager, Head of SE", type: "section", id: "career_soft_s2" },
        { name: "Global O*NET Classifications: Software Developers (15-1252.00), Computer Programmers (15-1251.00)", type: "section", id: "career_soft_s3" }
      ]
    },
    {
      name: "Infrastructure & Cybersecurity Track (IMDA Framework)",
      type: "source-doc",
      id: "career_infra",
      children: [
        { name: "Infrastructure Core Management: Associate Infra Engineer, Infrastructure Engineer, Engineering Manager, Architect, Head of Infra", type: "section", id: "career_infra_s1" },
        { name: "System Operations: SysOps Engineer, Network Engineer, Automation & Orchestration Engineer, Radio Frequency Engineer", type: "section", id: "career_infra_s2" },
        { name: "Cybersecurity Standards (O*NET): Information Security Analysts (15-1212.00), CIO / CTO Leadership", type: "section", id: "career_infra_s3" }
      ]
    }
  ]
};

export default function ComprehensiveThreeTierWorkspace() {
  const svgRef = useRef(null);
  const mainGroupRef = useRef(null);
  
  const [rpTree, setRpTree] = useState(JSON.parse(JSON.stringify(initialRpData)));
  const [uniTree, setUniTree] = useState(JSON.parse(JSON.stringify(initialUniData)));
  const [careerTree, setCareerTree] = useState(JSON.parse(JSON.stringify(initialCareerData)));
  const [expandedNodes, setExpandedNodes] = useState({});

  // Card Layout Dimensions (NotebookLM Specifications)
  const boxWidth = 245;
  const boxHeight = 70;
  const verticalNodeGap = 90; 
  const horizontalLayerGap = 340;

  const treeLayout = d3.tree().nodeSize([verticalNodeGap, horizontalLayerGap]);

  const toggleSubtreeNode = (root, targetName) => {
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
        if (toggleSubtreeNode(child, targetName)) return true;
      }
    }
    if (root._children) {
      for (let child of root._children) {
        if (toggleSubtreeNode(child, targetName)) return true;
      }
    }
    return false;
  };

  const handleNodeToggle = (nodeName) => {
    setExpandedNodes(prev => ({ ...prev, [nodeName]: !prev[nodeName] }));
    const rpCopy = { ...rpTree };
    const uniCopy = { ...uniTree };
    const careerCopy = { ...careerTree };
    
    if (!toggleSubtreeNode(rpCopy, nodeName)) {
      if (!toggleSubtreeNode(uniCopy, nodeName)) {
        toggleSubtreeNode(careerCopy, nodeName);
      }
    }
    setRpTree(rpCopy);
    setUniTree(uniCopy);
    setCareerTree(careerCopy);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    let mainGroup = d3.select(mainGroupRef.current);
    
    if (mainGroup.empty()) {
      mainGroup = svg.append("g").attr("ref-group", "main_canvas");
      mainGroupRef.current = mainGroup.node();

      svg.call(d3.zoom()
        .scaleExtent([0.05, 2.0])
        .on("zoom", (event) => {
          mainGroup.attr("transform", event.transform);
        }));
      
      mainGroup.attr("transform", `translate(${60}, ${40})`);
    }

    const d3RpRoot = d3.hierarchy(rpTree);
    const d3UniRoot = d3.hierarchy(uniTree);
    const d3CareerRoot = d3.hierarchy(careerTree);

    treeLayout(d3RpRoot);
    treeLayout(d3UniRoot);
    treeLayout(d3CareerRoot);

    // Adaptive bounding layout calculator prevents node overlapping
    const calculateSubtreeBoundsHeight = (d3Root) => {
      const nodes = d3Root.descendants();
      const xPositions = nodes.map(n => n.x);
      const minX = d3.min(xPositions) || 0;
      const maxX = d3.max(xPositions) || 0;
      return (maxX - minX) + verticalNodeGap * 4.5; 
    };

    const rpSectionHeight = calculateSubtreeBoundsHeight(d3RpRoot);
    const uniSectionHeight = calculateSubtreeBoundsHeight(d3UniRoot);

    const rpOffsetY = 0 - d3RpRoot.x;
    const uniOffsetY = rpOffsetY + rpSectionHeight - d3UniRoot.x;
    const careerOffsetY = uniOffsetY + uniSectionHeight - d3CareerRoot.x;

    const consolidatedNodes = [
      ...d3RpRoot.descendants().map(n => ({ ...n, x: n.x + rpOffsetY })),
      ...d3UniRoot.descendants().map(n => ({ ...n, x: n.x + uniOffsetY })),
      ...d3CareerRoot.descendants().map(n => ({ ...n, x: n.x + careerOffsetY }))
    ];

    const consolidatedLinks = [
      ...d3RpRoot.links().map(l => ({ source: { ...l.source, x: l.source.x + rpOffsetY }, target: { ...l.target, x: l.target.x + rpOffsetY } })),
      ...d3UniRoot.links().map(l => ({ source: { ...l.source, x: l.source.x + uniOffsetY }, target: { ...l.target, x: l.target.x + uniOffsetY } })),
      ...d3CareerRoot.links().map(l => ({ source: { ...l.source, x: l.source.x + careerOffsetY }, target: { ...l.target, x: l.target.x + careerOffsetY } }))
    ];

    const computeOrthogonalPath = (d) => {
      const startX = d.source.y + boxWidth;
      const startY = d.source.x + boxHeight / 2;
      const endX = d.target.y;
      const endY = d.target.x + boxHeight / 2;
      const midX = startX + (endX - startX) / 2;
      return `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;
    };

    const animationDuration = 350;

    // Links update pipeline
    const linkBinding = mainGroup.selectAll("path.workspace-link")
      .data(consolidatedLinks, d => d.target.data.id || d.target.data.name);

    linkBinding.enter()
      .append("path")
      .attr("class", "workspace-link")
      .attr("fill", "none")
      .attr("stroke", "#334155")
      .attr("stroke-width", "1.5px")
      .merge(linkBinding)
      .transition().duration(animationDuration)
      .attr("d", computeOrthogonalPath);

    linkBinding.exit().transition().duration(animationDuration).remove();

    // Cards update pipeline
    const nodeBinding = mainGroup.selectAll("g.workspace-node")
      .data(consolidatedNodes, d => d.data.id || d.data.name);

    const nodeEnterGroup = nodeBinding.enter()
      .append("g")
      .attr("class", "workspace-node")
      .attr("transform", d => `translate(${d.y}, ${d.x})`)
      .style("cursor", "pointer")
      .on("click", (e, d) => handleNodeToggle(d.data.name));

    nodeEnterGroup.append("rect")
      .attr("width", boxWidth)
      .attr("height", boxHeight)
      .attr("rx", 6)
      .attr("fill", d => {
        if (d.data.type === "root") return "#064e3b"; 
        if (d.data.type === "source-doc") return "#1e3a8a"; 
        return d.children || d._children ? "#312e81" : "#1e293b"; 
      })
      .attr("stroke", d => {
        if (d.data.type === "root") return "#10b981";
        if (d.data.type === "source-doc") return "#3b82f6";
        return d.children || d._children ? "#6366f1" : "#475569";
      })
      .attr("stroke-width", "1.5px");

    // Dynamic fluid text wrap container
    nodeEnterGroup.append("foreignObject")
      .attr("width", boxWidth - 16)
      .attr("height", boxHeight)
      .attr("x", 8)
      .attr("y", 0)
      .append("xhtml:div")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "flex")
      .style("align-items", "center")
      .style("color", "#f8fafc")
      .style("font-size", "11px")
      .style("font-family", "system-ui, sans-serif")
      .style("line-height", "1.3")
      .style("overflow", "hidden")
      .style("text-overflow", "ellipsis")
      .html(d => {
        const structuralKidsFlag = (d.data.children && d.data.children.length > 0) || (d.data._children && d.data._children.length > 0);
        return `
          <div style="width:100%; display:flex; justify-content:space-between; align-items:center; padding-right:2px;">
            <span style="overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;">${d.data.name}</span>
            ${structuralKidsFlag ? `<span style="font-size:9px; color:#10b981; font-weight:bold; flex-shrink:0; margin-left:4px;">${d.children ? "▼" : "▶"}</span>` : ""}
          </div>
        `;
      });

    nodeBinding.merge(nodeEnterGroup)
      .transition().duration(animationDuration)
      .attr("transform", d => `translate(${d.y}, ${d.x})`);

    nodeBinding.exit().transition().duration(animationDuration).remove();

  }, [rpTree, uniTree, careerTree]);

  const renderRecursiveSidebarItem = (node) => {
    const structuralKidsFlag = (node.children && node.children.length > 0) || (node._children && node._children.length > 0);
    const isExpanded = !!expandedNodes[node.name];
    return (
      <div key={node.id || node.name} style={{ marginLeft: "12px", borderLeft: "1px solid #1e293b", paddingLeft: "8px" }}>
        <div onClick={() => structuralKidsFlag && handleNodeToggle(node.name)}
          style={{ display: "flex", alignItems: "center", padding: "5px 6px", cursor: structuralKidsFlag ? "pointer" : "default", borderRadius: "4px", backgroundColor: isExpanded ? "#1e293b" : "transparent", color: node.type === "source-doc" ? "#60a5fa" : "#f1f5f9", fontSize: "13px", userSelect: "none" }}>
          {structuralKidsFlag && <span style={{ marginRight: "6px", fontSize: "9px", color: "#64748b" }}>{isExpanded ? "▼" : "▶"}</span>}
          <span style={{ marginRight: "6px" }}>{node.type === "root" ? "📁" : node.type === "source-doc" ? "📄" : "🔹"}</span>
          <span style={{ fontWeight: structuralKidsFlag ? "600" : "400" }}>{node.name}</span>
        </div>
        {isExpanded && node.children && node.children.map(child => renderRecursiveSidebarItem(child))}
        {isExpanded && node._children && node._children.map(child => renderRecursiveSidebarItem(child))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#0f172a", overflow: "hidden" }}>
      {/* DIRECTORY SIDEBAR PANELS */}
      <div style={{ width: "360px", height: "100%", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column", backgroundColor: "#0f172a", zIndex: 10 }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #1e293b" }}>
          <h2 style={{ color: "#10b981", margin: 0, fontSize: "16px", fontWeight: "700", fontFamily: "sans-serif" }}>NotebookLM Source Docs</h2>
          <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "11px", fontFamily: "sans-serif" }}>Full Uncompromised Multi-Tier Dataset</p>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 6px" }}>
          {renderRecursiveSidebarItem(rpTree)}
          <div style={{ height: "16px" }} />
          {renderRecursiveSidebarItem(uniTree)}
          <div style={{ height: "16px" }} />
          {renderRecursiveSidebarItem(careerTree)}
        </div>
      </div>
      
      {/* EXPANSIVE WORKSPACE AREA */}
      <div style={{ flex: 1, height: "100%", position: "relative" }}>
        <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}