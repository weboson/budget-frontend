//! диаграмма (график) 'recharts'
import { FC } from 'react';
// lib recharts
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

// Цвета диаграммы
const COLORS = ['#00C49F', '#FF8042'];

interface IChart {
    totalIncome: number
    totalExpense: number
}

// так как lib recharts требует массив именно с полями: name и value
interface IData {
    name: string
    value: number
}

const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => { // пропсы: значения сумм доходов/расходов
    
    // массив для recharts
    const data = new Array<IData>(
        {name: 'Income', value: totalIncome},
        {name: 'Expense', value: totalExpense},
    )
    
    return (
        // код из примера: https://recharts.org/en-US/examples/PieChartWithPaddingAngle
        <PieChart width={240} height={240}>
        <Pie
          data={data}
          cx={'50%'}
          cy={'50%'}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip/>
      </PieChart>
    );
};

export default Chart;
