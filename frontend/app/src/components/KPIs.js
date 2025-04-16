import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const KPIs = ({ ventas = [] }) => {
  const totalVentas = ventas.length;
  const totalIngresos = ventas.reduce((sum, v) => sum + parseFloat(v.total), 0);
  const ticketPromedio = totalVentas > 0 ? totalIngresos / totalVentas : 0;

  const calcularMasFrecuente = (items) => {
    if (items.length === 0) return 'N/A';
    const frecuencia = {};
    items.forEach(item => {
      frecuencia[item] = (frecuencia[item] || 0) + 1;
    });
    const max = Math.max(...Object.values(frecuencia));
    return Object.keys(frecuencia).find(k => frecuencia[k] === max) || 'N/A';
  };

  const productoMasVendido = calcularMasFrecuente(ventas.map(v => v.producto.nombre));
  const clienteFrecuente = calcularMasFrecuente(ventas.map(v => v.cliente.nombre));
  const añoMasVentas = calcularMasFrecuente(ventas.map(v => new Date(v.tiempo.fecha).getFullYear()));

  return (
    <div className="my-4">
      <Row className="mb-3">
        <Col md={4}>
          <Card body className="text-center">
            <strong>Total de Ventas</strong>
            <div>{totalVentas}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="text-center">
            <strong>Total Ingresos</strong>
            <div>€ {totalIngresos.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="text-center">
            <strong>Ticket Promedio</strong>
            <div>€ {ticketPromedio.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card body className="text-center">
            <strong>Producto más vendido</strong>
            <div>{productoMasVendido}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="text-center">
            <strong>Cliente más frecuente</strong>
            <div>{clienteFrecuente}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="text-center">
            <strong>Año con más ventas</strong>
            <div>{añoMasVentas}</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KPIs;
