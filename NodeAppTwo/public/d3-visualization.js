async function fetchData() {
    const response = await fetch('/compute');
    const result = await response.json();
    return result.data;
}

async function createVisualization() {
    const data = await fetchData();

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[0])])
        .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[1])])
        .range([height - margin.top - margin.bottom, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d[0]))
        .attr("cy", d => y(d[1]))
        .attr("r", 5);
}

createVisualization();
