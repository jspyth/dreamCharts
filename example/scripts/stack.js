var svg = dreamCharts.getSVG("#svg");
//定义需要的全局变量
var svg_width = svg.attr("width"),svg_height = svg.attr("height");
var wStart = svg_width*0.25,wEnd = svg_width*0.85,hStart = svg_height*0.2,hEnd = svg_height*0.9;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标

//给数据
var catogary = [2005,2006,2007,2008,2009,2010];
var List = [[3000,1300,3700,4900,700,700],[2000,4000,1810,6540,2820,1000],[1100,1700,1680,4000,4900,700]];
var maxList = [];
for(let j = 0;j < List[0].length;j++){
    maxList.push(List[0][j]+List[1][j]+List[2][j]);
}

dreamCharts.calPublicMax([maxList]);//如果多列数据就使用这个方法

var yAxis = dreamCharts.yAxis
    .settings(
    {
        data:maxList,
        ticks:6,
        distanceY:25,
        direction:wEnd-wStart,
        xOffsetText:-65,
        yOffsetText:7,
        getPublicMax:true
    }
);

yAxis.drawYLine(wStart,hStart,hEnd)
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px"
    });
yAxis.drawYGraduationLine(wStart,hStart,hEnd,"yGraduationLine")
    .attr({
        stroke: "white",
        strokeWidth: "1px",
        opacity:.5
    });
yAxis.drawYText(wStart,hStart,hEnd,"yText")
    .attr(
    {
        fill:"rgb(233,233,9)",
        strokeWidth:"1px"
    }
);

/*******************x轴************************/
var xAxis = dreamCharts.xAxis
    .settings({
        data:catogary,
        distanceX:85,
        xOffsetText:-15,
        yOffsetText:30,
        direction:15,
        allOffset:1
    });
//x轴水平长线
xAxis.drawXLine(wStart,wEnd-80,hEnd)
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px"
    });

//x轴刻度线
xAxis.drawXGraduationLine(wStart,wEnd,hEnd,"xGraduationLine")
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px",
        opacity:1
    });

//x轴文本值
xAxis.drawXText(wStart,hEnd,wEnd,"xText")
    .attr({
        fill:"rgb(233,233,9)",
        strokeWidth:"1px"
    });

var stack = dreamCharts.stack.settings({
    data:List,
    multiple:0.7,
    getPublicMax:true//堆叠图情况特殊，这里是false还是true结果都相同
});

stack.drawStack(wStart,wEnd,hStart,hEnd,"stack");


var allStack = svg.selectAll(".stack");
dreamCharts.addEventListener(allStack,"click",function(){
    this.attr({
        fill:"red"
    })
});
