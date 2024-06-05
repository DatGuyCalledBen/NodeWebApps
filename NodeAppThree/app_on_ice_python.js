document.addEventListener("DOMContentLoaded", async function () {
    async function loadPyodideAndRun() {
        let pyodide = await loadPyodide();
        await pyodide.loadPackage(['numpy', 'scipy']);
        await pyodide.runPythonAsync(`
            import numpy as np
            from scipy.integrate import solve_ivp

            def vortex_ode(t, y, no, circulations):
                epsilon = 1e-8
                dydt = []
                for i in range(no):
                    xi = y[2 * i]
                    yi = y[2 * i + 1]
                    sum_x, sum_y = 0, 0
                    for j in range(no):
                        if i != j:
                            xj = y[2 * j]
                            yj = y[2 * j + 1]
                            common_denominator = (xi - xj) ** 2 + (yi - yj) ** 2 + epsilon
                            sum_x += (circulations[j] / (2 * np.pi)) * ((xi - xj) / common_denominator)
                            sum_y += (circulations[j] / (2 * np.pi)) * ((yi - yj) / common_denominator)
                    dydt.append(sum_y)
                    dydt.append(-sum_x)
                return dydt

            def run_simulation():
                no = 3
                circulations = np.random.uniform(-5, 10, no)
                initial_conditions = np.random.uniform(-10, 10, 2 * no)
                t_span = (0, 1000)
                t_eval = np.linspace(t_span[0], t_span[1], 1000)
                solution = solve_ivp(vortex_ode, t_span, initial_conditions, t_eval=t_eval, args=(no, circulations))
                return solution.y.tolist()
            
            solution = run_simulation()
        `);
        let solution = pyodide.globals.get('solution').toJs();
        plotSolution(solution);
    }

    function plotSolution(solution) {
        let traces = [];
        for (let i = 0; i < solution.length / 2; i++) {
            traces.push({
                x: solution[2 * i],
                y: solution[2 * i + 1],
                mode: 'lines',
                name: `Vortex ${i + 1}`
            });
        }
        Plotly.newPlot('plot', traces);
    }

    loadPyodideAndRun();
});
