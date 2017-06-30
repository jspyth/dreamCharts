var svg = dreamCharts.getSVG("#svg");
//定义需要的全局变量
var svg_width = svg.attr("width"),svg_height = svg.attr("height");
var wStart = svg_width*0.1,wEnd = svg_width*0.98,hStart = svg_height*0.1,hEnd = svg_height*0.9;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标
//给数据
var List = [[3000,1300,3700,4900,700,700,300],[2000,4000,1810,6540,2820,1000,3000],[1100,1700,1680,4000,4900,700,1300],[1500,300,3700,2900,1700,2700,3300],[1000,1000,1810,7540,2820,1000,300]];
var parallel = dreamCharts.parallel
    .settings(
    {
        data:List,
        ticks:13,
        distanceY:0,
        direction:-18,
        xOffsetText:-65,
        yOffsetText:7
    }
);

var interval = (wEnd-wStart)/List.length;
parallel.drawParallelYAxis(wStart,hStart,hEnd,1,"first","parallel");
parallel.drawParallelYAxis(wStart+interval,hStart,hEnd,2,"second","parallel");
parallel.drawParallelYAxis(wStart+interval*2,hStart,hEnd,3,"third","parallel");
parallel.drawParallelYAxis(wStart+interval*3,hStart,hEnd,4,"forth","parallel");
parallel.drawParallelYAxis(wStart+interval*4,hStart,hEnd,5,"fifth","parallel");
svg.selectAll(".parallel").attr({
    stroke:"#fff000",
    strokeWidth:"1.5px"
});
svg.selectAll(".YText").attr({
    fill:"green",
    stroke:"green",
    fontSize:"15px"
});
svg.selectAll(".title").attr({
    fill:"white",
    stroke:"white"
});
parallel.drawParallelDiagram(wStart,wEnd,hStart,hEnd,"Poly")
    .attr({
        stroke:"#f000ff",
        strokeWidth:"1.5px",
        fill:"none"
    });
