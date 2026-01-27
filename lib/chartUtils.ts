type GroupedRevenue = Record<string, Record<string,number>>;


export type ChartDataPoint = {
    name:string;
    Revenue:number;
};


export function transformRevenueForChart(
    grouped:GroupedRevenue,
    category:string,
    period:"week" | "month" | "year"
): ChartDataPoint[] {

    // get data for specific category 
    const categoryData = grouped[category] || {};

    let labels:string[];


    if (period === "week"){
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (period === "month"){
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
    } else {
        labels = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
    };

    // map each label to its revenue 
    return labels.map((label) => ({
        name:label,
        Revenue:categoryData[label] || 0,
    }));

}