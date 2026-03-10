export interface FormatterOption {
    key: string;
    description: string;
    example: string;
    accepts?: string[];
}

export const formattersDefinition: FormatterOption[] = [
    {
        key: "upper",
        description: "Convierte el texto a mayúsculas.",
        example: "{{ nombre | upper }}",
    },
    {
        key: "lower",
        description: "Convierte el texto a minúsculas.",
        example: "{{ nombre | lower }}",
    },
    {
        key: "number",
        description: "Formatea un número con separadores de miles y 2 decimales.",
        example: "{{ monto | number }}",
    },
    {
        key: "number:trim",
        description: "Formatea un número con separadores de miles, eliminando los decimales innecesarios.",
        example: "{{ monto | number:trim }}",
    },
    {
        key: "number:es",
        description: "Convierte un número a su representación en palabras en español.",
        example: "{{ monto | number:es }}",
    },
    {
        key: "number:<fmt>",
        description: "Formatea un número usando cualquier formato numérico de .NET.",
        example: "{{ monto | number:N0 }}",
        accepts: ["N0 → 300,000", "N2 → 300,000.00", "N4 → 300,000.0000", "C2 → $300,000.00", "F2 → 300000.00", "E2 → 3.00E+005"],
    },
    {
        key: "date:<fmt>",
        description: "Formatea una fecha usando cualquier formato de fecha de .NET.",
        example: "{{ fecha | date:dd/MM/yyyy }}",
        accepts: ["dd/MM/yyyy → 30/05/2025", "MM/dd/yyyy → 05/30/2025", "yyyy-MM-dd → 2025-05-30", "d/M/yyyy → 9/3/2026", "dd 'de' MMMM 'de' yyyy → 30 de mayo de 2025", "dddd → viernes"],
    },
    {
        key: "percentage",
        description: "Multiplica un valor decimal por 100 para expresarlo como porcentaje.",
        example: "{{ tasa | percentage }}",
    },
    {
        key: "int",
        description: "Renderiza un número como entero, eliminando los decimales.",
        example: "{{ monto | int }}",
    },
    {
        key: "month",
        description: "Extrae el número de mes de un valor de fecha.",
        example: "{{ fecha | month }}",
    },
    {
        key: "dni",
        description: "Formatea una cédula dominicana con guiones estándar.",
        example: "{{ cedula | dni }}",
    },
];