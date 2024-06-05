#include <vector>
#include <cmath>
#include <cstdlib>
#include <ctime>

const int no = 3;
std::vector<double> circulations(no);

// Function to calculate the ODEs
std::vector<double> vortex_ode(double t, const std::vector<double>& y) {
    double epsilon = 1e-8;
    std::vector<double> dydt(2 * no);

    for (int i = 0; i < no; ++i) {
        double xi = y[2 * i];
        double yi = y[2 * i + 1];
        double sum_x = 0;
        double sum_y = 0;
        for (int j = 0; j < no; ++j) {
            if (i != j) {
                double xj = y[2 * j];
                double yj = y[2 * j + 1];
                double common_denominator = (xi - xj) * (xi - xj) + (yi - yj) * (yi - yj) + epsilon;
                sum_x += (circulations[j] / (2 * M_PI)) * ((xi - xj) / common_denominator);
                sum_y += (circulations[j] / (2 * M_PI)) * ((yi - yj) / common_denominator);
            }
        }
        dydt[2 * i] = sum_y;
        dydt[2 * i + 1] = -sum_x;
    }

    return dydt;
}

extern "C" {
    // Function to initialize the circulations and run the simulation
    void run_simulation(double* initial_conditions, double* results, int steps, double dt) {
        // Initialize circulations
        srand(time(0));
        for (int i = 0; i < no; ++i) {
            circulations[i] = ((double) rand() / RAND_MAX) * 15.0 - 5.0;
        }

        std::vector<double> y(initial_conditions, initial_conditions + 2 * no);
        std::vector<double> y_new(2 * no);

        for (int step = 0; step < steps; ++step) {
            std::vector<double> dydt = vortex_ode(0.0, y);
            for (int i = 0; i < 2 * no; ++i) {
                y_new[i] = y[i] + dt * dydt[i];
                results[step * 2 * no + i] = y_new[i];
            }
            y = y_new;
        }
    }
}
