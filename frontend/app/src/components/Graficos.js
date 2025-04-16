import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graficos = ({ ventas = [] }) => {
  if (ventas.length === 0) return <p className="text-center">No hay datos para mostrar.</p>;

  // Agrupamos ventas por año
  const ventasPorAño = ventas.reduce((acc, v) => {
    const año = new Date(v.tiempo.fecha).getFullYear();
    acc[año] = (acc[año] || 0) + 1;
    return acc;
  }, {});
  const dataBarra = Object.entries(ventasPorAño).map(([año, total]) => ({ año, total }));

  // Agrupamos ingresos por mes
  const ingresosPorMes = ventas.reduce((acc, v) => {
    const fecha = new Date(v.tiempo.fecha);
    const key = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;
    acc[key] = (acc[key] || 0) + parseFloat(v.total);
    return acc;
  }, {});
  const dataLinea = Object.entries(ingresosPorMes).map(([mes, total]) => ({ mes, total }));

  return (
    <div className="my-5">
      <h4 className="text-center mb-3">Ventas por Año</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataBarra}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="año" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#d6001c" />
        </BarChart>
      </ResponsiveContainer>

      <h4 className="text-center mt-5 mb-3">Ingresos por Mes</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataLinea}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#0071c5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graficos;
