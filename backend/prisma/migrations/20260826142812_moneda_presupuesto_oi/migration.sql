-- El PM ahora puede elegir si el presupuesto de la Sección 2 está en USD o COP.
ALTER TABLE ordenes_internas
ADD COLUMN presupuesto_moneda VARCHAR(3) NOT NULL DEFAULT 'COP';