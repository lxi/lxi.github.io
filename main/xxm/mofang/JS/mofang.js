var ai=2;
b=[[1,1,1,1,1,1,1,1,1],[2,2,2,2,2,2,2,2,2],[3,3,3,3,3,3,3,3,3],[4,4,4,4,4,4,4,4,4],[5,5,5,5,5,5,5,5,5],[0,0,0,0,0,0,0,0,0]];

function bianhuan(){
    for(var i=1;i<=6;i++){
        for(var n=1;n<=9;n++) {
            document.getElementById("a"+i+n).className="a a"+n+" n"+b[i-1][n-1];
            document.getElementById("yangshi").href="CSS/peise_2.css";
            document.getElementById("yangshi").href="CSS/peise_"+ai+".css";
        }
    }
}

function net(l,i)//l:0/1{顺/逆}  i:面号0、1、2、3、4、5
{
var n1=0;
var n2=0;
var n3=0;
var n4=0;
var n=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
switch (i)
{
case 0:
n1=4;n2=3;n3=5;n4=2;
var d1=[6,7,8];
var e1=[0,3,6];
var f1=[2,1,0];
var g1=[8,5,2];
n[0]=d1;n[1]=e1;n[2]=f1;n[3]=g1;
break;
case 1:
n1=3;n2=4;n3=2;n4=5;
var d2=[8,5,2];
var e2=[2,1,0];
var f2=[0,3,6];
var g2=[6,7,8];
n[0]=d2;n[1]=e2;n[2]=f2;n[3]=g2;
break;
case 2:
n1=0;n2=5;n3=1;n4=4;
var d3=[0,3,6];
var e3=[0,3,6];
var f3=[8,5,2];
var g3=[0,3,6];
n[0]=d3;n[1]=e3;n[2]=f3;n[3]=g3;
break;
case 3:
n1=0;n2=4;n3=1;n4=5;
var d4=[8,5,2];
var e4=[8,5,2];
var f4=[0,3,6];
var g4=[8,5,2];
n[0]=d4;n[1]=e4;n[2]=f4;n[3]=g4;
break;
case 4:
n1=0;n2=2;n3=1;n4=3;
var d5=[0,1,2];
var e5=[0,1,2];
var f5=[0,1,2];
var g5=[0,1,2];
n[0]=d5;n[1]=e5;n[2]=f5;n[3]=g5;
break;
case 5:
n1=0;n2=3;n3=1;n4=2;
var d6=[6,7,8];
var e6=[6,7,8];
var f6=[6,7,8];
var g6=[6,7,8];
n[0]=d6;n[1]=e6;n[2]=f6;n[3]=g6;
break;
}
var m=0;
if(l==0)
{
m=b[i][0];
b[i][0]=b[i][6];
b[i][6]=b[i][8];
b[i][8]=b[i][2];
b[i][2]=m;
m=b[i][1];
b[i][1]=b[i][3];
b[i][3]=b[i][7];
b[i][7]=b[i][5];
b[i][5]=m;
for(var j=0;j<3;j++)
{
m=b[n1][n[0][j]];
b[n1][n[0][j]]=b[n4][n[3][j]];
b[n4][n[3][j]]=b[n3][n[2][j]];
b[n3][n[2][j]]=b[n2][n[1][j]];
b[n2][n[1][j]]=m;
}
}
else
{
m=b[i][0];
b[i][0]=b[i][2];
b[i][2]=b[i][8];
b[i][8]=b[i][6];
b[i][6]=m;
m=b[i][1];
b[i][1]=b[i][5];
b[i][5]=b[i][7];
b[i][7]=b[i][3];
b[i][3]=m;
for(var j=0;j<3;j++)
{
m=b[n1][n[0][j]];
b[n1][n[0][j]]=b[n2][n[1][j]];
b[n2][n[1][j]]=b[n3][n[2][j]];
b[n3][n[2][j]]=b[n4][n[3][j]];
b[n4][n[3][j]]=m;
}
}
}

function com(l,i)//l:0/1{顺/逆}  i:位置0、1、2
{
var n1=0;
var n2=0;
var n3=0;
var n4=0;
var n=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
switch(i)
{
case 0://yz
n1=4;n2=3;n3=5;n4=2;
var d1=[3,4,5];
var e1=[1,4,7];
var f1=[5,4,3];
var g1=[7,4,1];
n[0]=d1;n[1]=e1;n[2]=f1;n[3]=g1;
break;
case 1://xy
n1=0;n2=3;n3=1;n4=2;
var d2=[3,4,5];
var e2=[3,4,5];
var f2=[3,4,5];
var g2=[3,4,5];
n[0]=d2;n[1]=e2;n[2]=f2;n[3]=g2;
break;
case 2://xz
n1=0;n2=5;n3=1;n4=4;
var d3=[1,4,7];
var e3=[1,4,7];
var f3=[7,4,1];
var g3=[1,4,7];
n[0]=d3;n[1]=e3;n[2]=f3;n[3]=g3;
break;
}
var m=0;
if(l==0)
{
for(var j=0;j<3;j++)
{
m=b[n1][n[0][j]];
b[n1][n[0][j]]=b[n4][n[3][j]];
b[n4][n[3][j]]=b[n3][n[2][j]];
b[n3][n[2][j]]=b[n2][n[1][j]];
b[n2][n[1][j]]=m;
}
}
else
{
for(var j=0;j<3;j++)
{
m=b[n1][n[0][j]];
b[n1][n[0][j]]=b[n2][n[1][j]];
b[n2][n[1][j]]=b[n3][n[2][j]];
b[n3][n[2][j]]=b[n4][n[3][j]];
b[n4][n[3][j]]=m;
}
}
}
function lin1() {net(0,0);bianhuan();}
function lin2() {net(0,1);bianhuan();}
function lin3() {net(0,2);bianhuan();}
function lin4() {net(0,3);bianhuan();}
function lin5() {net(0,4);bianhuan();}
function lin6() {net(0,5);bianhuan();}
function lin7() {net(1,0);bianhuan();}
function lin8() {net(1,1);bianhuan();}
function lin9() {net(1,2);bianhuan();}
function lin10(){net(1,3);bianhuan();}
function lin11(){net(1,4);bianhuan();}
function lin12(){net(1,5);bianhuan();}
function lin13(){com(0,0);bianhuan();}
function lin14(){com(0,1);bianhuan();}
function lin15(){com(0,2);bianhuan();}
function lin16(){com(1,0);bianhuan();}
function lin17(){com(1,1);bianhuan();}
function lin18(){com(1,2);bianhuan();}

var l1=316;
var l2=33;
var g=1;
var f=0;
function lookset(l,k)
{
switch (l)
{
case 1:l1=(l1+0.2*k)%360;break;
case 2:l2=(l2+0.2*k)%360;break;
case 3:l1=(l1-0.2*k)%360;break;
case 4:l2=(l2-0.2*k)%360;break;
case 5:l1=(l1+0.2)%360;l2=(l2+0.2)%360;break;
}
document.getElementById("mj").style.transform="rotateX("+l1+"deg) rotateY("+l2+"deg)";
}
var look=null;
function looksetR(lk)
{
if(f==lk){g+=2;}else{f=lk;g=1;}
if(look!=null)clearInterval(look);
look=setInterval(function(){lookset(lk,g)},10);
document.getElementById("look00").src="JPG/nl_0.png";
document.getElementById("look0").onclick=new Function("looksetL()");
}
function looksetL()
{
clearInterval(look);
g=1;f=0;
document.getElementById("look00").src="JPG/l_0.png";
document.getElementById("look0").onclick=new Function("looksetR(5)");
}

function build()
{
str="<div class=\"wrap\"><div id=\"mj\" class=\"cube\">"
for(var i=1;i<=6;i++)
{
var aling=null;
var min="A";
switch(i)
{
case 1:aling="out-front";min="A";break;
case 2:aling="out-back";min="B";break;
case 3:aling="out-left";min="C";break;
case 4:aling="out-right";min="D";break;
case 5:aling="out-top";min="E";break;
case 6:aling="out-bottom";min="F";break;
}
str+="<div class="+aling+">";
for(var n=1;n<=9;n++)
{
str+="<div id=\"a"+i+""+n+"\" class=\"a a"+n+" n"+b[i-1][n-1]+"\"> ";
var x=[0,0];
var y=[0,0];
var z=[0,0];
var k=0;
switch(n)
{
case 1:x[0]=2;x[1]=3;y[0]=1;y[1]=4;k=1;break;
case 2:x[0]=5;y[0]=1;break;
case 3:x[0]=1;x[1]=4;y[0]=1;y[1]=2;k=1;break;
case 4:x[0]=5;y[0]=4;break;
case 5:x[0]=5;y[0]=5;if(i==1)y[0]=6;break;
case 6:x[0]=5;y[0]=2;break;
case 7:x[0]=1;x[1]=4;y[0]=4;y[1]=3;k=1;break;
case 8:x[0]=5;y[0]=3;break;
case 9:x[0]=2;x[1]=3;y[0]=2;y[1]=3;k=1;break;
}
switch(i)
{
case 1:
switch(n)
{
case 1:z[0]=9;z[1]=5;break;
case 2:z[0]=18;break;
case 3:z[0]=4;z[1]=11;break;
case 4:z[0]=17;break;
case 5:break;
case 6:z[0]=14;break;
case 7:z[0]=12;z[1]=3;break;
case 8:z[0]=15;break;
case 9:z[0]=6;z[1]=10;break;
}
break;
case 2:
switch(n)
{
case 1:z[0]=10;z[1]=5;break;
case 2:z[0]=15;break;
case 3:z[0]=3;z[1]=11;break;
case 4:z[0]=17;break;
case 5:break;
case 6:z[0]=14;break;
case 7:z[0]=12;z[1]=4;break;
case 8:z[0]=18;break;
case 9:z[0]=6;z[1]=9;break;
}
break;
case 3:
switch(n)
{
case 1:z[0]=8;z[1]=5;break;
case 2:z[0]=13;break;
case 3:z[0]=1;z[1]=11;break;
case 4:z[0]=17;break;
case 5:break;
case 6:z[0]=14;break;
case 7:z[0]=12;z[1]=2;break;
case 8:z[0]=16;break;
case 9:z[0]=6;z[1]=7;break;
}
break;
case 4:
switch(n)
{
case 1:z[0]=7;z[1]=5;break;
case 2:z[0]=16;break;
case 3:z[0]=2;z[1]=11;break;
case 4:z[0]=17;break;
case 5:break;
case 6:z[0]=14;break;
case 7:z[0]=12;z[1]=1;break;
case 8:z[0]=13;break;
case 9:z[0]=6;z[1]=8;break;
}
break;
case 5:
switch(n)
{
case 1:z[0]=9;z[1]=2;break;
case 2:z[0]=18;break;
case 3:z[0]=4;z[1]=8;break;
case 4:z[0]=16;break;
case 5:break;
case 6:z[0]=13;break;
case 7:z[0]=7;z[1]=3;break;
case 8:z[0]=15;break;
case 9:z[0]=1;z[1]=10;break;
}
break;
case 6:
switch(n)
{
case 1:z[0]=9;z[1]=1;break;
case 2:z[0]=18;break;
case 3:z[0]=4;z[1]=7;break;
case 4:z[0]=13;break;
case 5:break;
case 6:z[0]=16;break;
case 7:z[0]=8;z[1]=3;break;
case 8:z[0]=15;break;
case 9:z[0]=2;z[1]=10;break;
}
break;
}
if(n!=5)
{
for(var l=0;l<=k;l++)
{
str+="<a class=\"AN AN"+x[l]+"\"  onclick=\"lin"+z[l]+"()\"><img src=\"JPG/an_"+y[l]+".png\" width=\"100%\" /></a>";
}
}
else if(i==5)           /*******************logo********************/
{
str+="<img src=\"JPG/an_logo.png\" width=\"100%\" />"
}else str+="<img src=\"JPG/an_5.png\" width=\"100%\" />";

str+="</div>"
}
str+="</div>"
}

str+="<span class=\"in-front\"></span>"
str+="<span class=\"in-back\"></span>"
str+="<span class=\"in-left\"></span>"
str+="<span class=\"in-right\"></span>"
str+="<span class=\"in-top\"></span>"
str+="<span class=\"in-bottom\"></span>"

str+="</div></div>"
return str;
}


function suiji(){
    var sjzs=0;
    var ci=Math.floor(Math.random()*15+9);
    /*console.log(ci);*/
    for(var k=0;k<ci;k++){
        sjzs=Math.floor(Math.random()*18+1);
        /*console.log(sjzs);*/
        switch(sjzs){
            case 1:lin1();break;
            case 2:lin2();break;
            case 3:lin3();break;
            case 4:lin4();break;
            case 5:lin5();break;
            case 6:lin6();break;
            case 7:lin7();break;
            case 8:lin8();break;
            case 9:lin9();break;
            case 10:lin10();break;
            case 11:lin11();break;
            case 12:lin12();break;
            case 13:lin13();break;
            case 14:lin14();break;
            case 15:lin15();break;
            case 16:lin16();break;
            case 17:lin17();break;
            case 18:lin18();break;
        }
    }
}

function huanyuan(){
    b=[[1,1,1,1,1,1,1,1,1],[2,2,2,2,2,2,2,2,2],[3,3,3,3,3,3,3,3,3],[4,4,4,4,4,4,4,4,4],[5,5,5,5,5,5,5,5,5],[0,0,0,0,0,0,0,0,0]];
    bianhuan();
}
window.onload=function(){
    document.getElementById("mj").style.transform="rotateX("+l1+"deg) rotateY("+l2+"deg)";
}


function yangshi(a){
    ai=a;
    document.getElementById("yangshi").href="CSS/peise_"+a+".css";
}