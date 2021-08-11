
var x;
var z;
var Asreq;
var a;
var c;
var Asv;
var vc;
var v;
var fs;
var md;
var permissible;
var Asprov;
var barn;
let kprim = 0.156;
let b;
let h;
let d;
let fcu;
let fyl;
let fyv;
let m;
let dprim;
let dbar;
let V;
let ASPROV;
let Sv;
let span;
let basic;
let ASPROv;




const momentContainer = document.querySelector(".moment__container");
const dprimContainer = document.querySelector(".dprim__container");
const dbarContainer = document.querySelector(".dbar__container");
const shearContainer = document.querySelector(".shear__container");
const ASPROVContainer = document.querySelector(".ASPROV__container");
const SvContainer = document.querySelector(".Sv__container");
const deflectionContainer = document.querySelector(".deflection__container");
const btnGroup = document.querySelector(".btn__container");


const supportBtn = document.querySelector("#support");
const midspanBtn = document.querySelector("#midspan");
const calculateMomentBtn = document.querySelector("#calculateMomentBtn");
const calculateDprimBtn = document.querySelector("#calculateDprim");
const calculateDbarBtn = document.querySelector("#calculateDbar");
const calculateShearBtn = document.querySelector("#calculateShearBtn");
const calculateASPROVBtn = document.querySelector("#calculateASPROVBtn");
const calculatedeflectionBTN = document.querySelector("#calculatedeflectionBtn");
const calculateSvBtn = document.querySelector("#calculateSvBtn");

function getinputvalue() {

    b = document.getElementById("b").value;
    h = document.getElementById("h").value;
    d = document.getElementById("d").value;
    fcu = document.getElementById("fcu").value;
    fyl = document.getElementById("fyl").value;
    fyv = document.getElementById("fyv").value;
    m = document.getElementById("m").value;
    dprim = document.getElementById("dprim").value;
    dbar = document.getElementById("dbar").value;
    V = document.getElementById("V").value;
    ASPROV = document.getElementById("ASPROV").value;
    Sv = document.getElementById("Sv").value;
    span = document.getElementById("span").value;
    basic = document.getElementById("basic").value;
    ASPROv = document.getElementById("ASPROv").value;



}

// Calculate const K
const k = () => (m * (Math.pow(10, 6))) / ((b * (Math.pow(d, 2)) * fcu));


// Hide Support and midspan buttons
const HideButtonGroup = () => btnGroup.style.display = "none";
const displayMomentContainer = () => momentContainer.style.display = "block";
const displayDprimContainer = () => dprimContainer.style.display = "block";
const displayDbarContainer = () => dbarContainer.style.display = "block";
const displayShearContainer = () => shearContainer.style.display = "block";
const displayASPROVContainer = () => ASPROVContainer.style.display = "block";
const displaySvContainer = () => SvContainer.style.display = "block";
const displaydeflectionContainer = () => deflectionContainer.style.display = "block";



const RenderK = () => {

    console.log(`<br>k = M &#215 10^6)/(b&#215(d^2)&#215fcu) = (${m}*10*6)/(${b}*(${d}^2)*${fcu}) = ${k().toFixed(5)}`);
    $("#display").append(`<p>k &#61 (M &#215 10&#178)&#x2215(b&#215(d&#178)&#215fcu) = (${m} &#215 10 &#215 6)&#x2215(${b} &#215 (${d}&#178) &#215 ${fcu}) = ${k().toFixed(5)}`);

};

const AsRequired = () => {

    if (k() <= kprim) {
        x = 0.5 + Math.sqrt(0.25 - (k() / 0.9));
        console.log("k &#8804 k', compression reinforcement is not required and: ");
        $("#display").append("<b>k &#8804 k', compression reinforcement is not required and:</b></br></P>");
        console.log(`x = 0.5 + sqrt(0.25 &#8722; k/0.9) = 0.5 + sqrt(0.25 &#8722; ${k().toFixed(5)}/0.9) = ${x.toFixed(3)}`);
        $("#display").append("x = 0.5 + &#8730; (0.25 &#8722; k&#8725;0.9) = 0.5 + &#8730; (0.25 &#8722; ", k().toFixed(5), "&#8725;0.9) = ", x.toFixed(3));


        if (x > 0.95) {
            x = 0.95;
            console.log('since x > 0.95,');
            $("#display").append('<br><b>Since x > 0.95,');
            console.log('x = ', ' ', x.toFixed(2));
            $("#display").append('<br>x = ', ' ', x.toFixed(2));
        } else if (x <= 0.95) {
            console.log('since x<=0.95');
            $("#display").append('<br><b>Since &#8804; 0.95,');
            console.log(`x = ${x.toFixed(4)}`);
            $("#display").append('<br>x = ', ' ', x.toFixed(2));
        }

        z = x * d;
        console.log(`z = x*d = ${z.toFixed(1)} mm`);
        $("#display").append(`<br>z = x &#215; d = ${z.toFixed(1)} mm`);

        Asreq = (m * (Math.pow(10, 6))) / (0.95 * fyl * z);
        console.log(`Asreq = M/0.95fyz = ${(m)} 10^6/(0.95*${fyl} * ${z.toFixed(1)}) = ${Asreq.toFixed(1)} mm^2`);
        $("#display").append(`<br>Asreq = M&#8725;0.95fyz = ${(m)} &#215;10&#8310; &#8725;(0.95&#215;${fyl} &#215; ${z.toFixed(1)}) = ${Asreq.toFixed(1)} mm&#178;`);
    } else if (k() > kprim) {
        console.log("k > k', compression reinforcement is required and:");
        $("#display").append("<b>k > k', compression reinforcement is required and:</b></br>");
        z = (d * 0.5) + ((Math.sqrt(0.25 - (kprim / 0.9))) * d);
        console.log("z =d (0.5+sqrt(0.25 - k'/0.9)) = ", d, '(0.5+sqrt(0.25-0.156/0.9)) = ', z.toFixed(1));
        $("#display").append("<br>z =d (0.5 + &#8730;(0.25 &#8722; k'&#8725;0.9)) = ", d, '(0.5 + &#8730;(0.25 &#8722; 0.156&#8725;0.9)) = ', z.toFixed(1));
        x = (d - z) / 0.45;
        console.log("x = (d - z)/0.45 = (", d, "-", z.toFixed(1), ")/0.45 = ", x.toFixed(1));
        $("#display").append("<br>x = (d &#8722; z)&#8725;0.45 = (", d, "&#8722;", z.toFixed(1), ")&#8725;0.45 = ", x.toFixed(1));
        displayDprimContainer();
    }
    displayDbarContainer();



};



const CalculateMoment = (e) => {
    getinputvalue();
    e.preventDefault();
    RenderK();
    AsRequired();
};

const MYsupport = (e) => {
    e.preventDefault();
    getinputvalue();
    console.log("Design for bending moment");
    $("#display").append("<b>Design for bending moment</b></br>");
    console.log("REF: BS 8 moment110-1:1997.CL. 3.4.4.4");
    $("#display").append("<b>REF: BS 8110-1:1997.CL. 3.4.4.4</b></br></P>");
    console.log(`kprim = ${kprim}`);
    $("#display").append("k' = ", kprim);
    HideButtonGroup();
    displayMomentContainer();
    displayShearContainer();





};
const MYmidspan = (e) => {
    getinputvalue();
    e.preventDefault();
    console.log("Design for bending moment");
    $("#display").append("<b>Design for bending moment</b></br>");
    console.log("REF: BS 8110-1:1997.CL. 3.4.4.4");
    $("#display").append("<b>REF: BS 8110-1:1997.CL. 3.4.4.4</b></br></P>");
    console.log(`k' = ${kprim}`);
    $("#display").append("k' =", kprim);
    HideButtonGroup();
    displayMomentContainer();
    displaydeflectionContainer();


};

const calculateDprim = (e) => {
    getinputvalue();
    e.preventDefault();
    const Asprim = ((k() - kprim) * fcu * b * d * d) / (0.95 * fyl * (d - dprim));
    console.log("As' = (k – k')fcu*bd^2/0.95fy(d – d') = ((", k().toFixed(1), "-", kprim, ")", fcu, "*", b, "*", d, "^2)/(0.95*", fyl, "*(", d, "-", dprim, ')) = ', Asprim.toFixed(1), "mm^2");
    $("#display").append("<br>As' = (k &#8722; k')fcu&#215;bd&#178; &#8725;0.95fy(d &#8722; d') = ((", k().toFixed(1), "&#8722;", kprim, ")", fcu, "&#215;", b, "&#215;", d, "&#178;)&#8725;(0.95&#215;", fyl, "&#215;(", d, "&#8722;", dprim, ')) = ', Asprim.toFixed(1), "mm&#178;");
    Asreq = (kprim * fcu * b * d * d) / (0.95 * fyl * z + Asprim);
    console.log("Asreq = (k*fcu*bd^2/(0.95fy*z + As') = (", k().toFixed(1), "*", fcu, "*", b, "*", d, "^2)/(0.95*", fyl, "*", z.toFixed(1), "+", Asprim.toFixed(1), ") = ", Asreq.toFixed(1), "mm^2");
    $("#display").append("<br>Asreq = (k&#215;fcu&#215;bd&#178; &#8725;(0.95fy&#215;z + As') = (", k().toFixed(1), "&#215;", fcu, "&#215;", b, "&#215;", d, "&#178;)&#8725;(0.95&#215;", fyl, "&#215;", z.toFixed(1), "+", Asprim.toFixed(1), ") = ", Asreq.toFixed(1), "mm&#178;");


};

const calculateDbar = (e) => {
    getinputvalue();
    e.preventDefault();
    Asprov = (Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0);
    if (Asprov < Asreq) {
        if (((Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0) + (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0)) / ((Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0)) == 1) {
            Asprov = ((Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0) + 2 * (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0);
            console.log("Asprov = ", Asprov);
            console.log(2);
            $("#display").append("<br>Asprov = ", Asprov, "mm&#178;");
            barn = Asprov / ((Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0));
            console.log("solution: ", Math.round(barn), "Y", Math.round(dbar));
            $("#display").append("<b><br>Solution: ", Math.round(barn), "<b>Y", Math.round(dbar));
        } else if (((Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0) + (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0)) / ((Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0)) > 1) {
            Asprov = ((Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0) + (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0);
            console.log("Asprov = ", Asprov);
            console.log(1);
            $("#display").append("<br>Asprov = ", Asprov, "mm&#178;");
            barn = ((Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0));
            console.log("solution: ", Math.round(barn), "Y", Math.round(dbar));
            $("#display").append("<b><br>Solution: ", Math.round(barn), "<b>Y", Math.round(dbar));
        }
    } else if (Asprov > Asreq) {
        if ((Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0) / (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0) == 1) {
            Asprov = (Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0);
            const Asprov1 = Asprov * 2;
            console.log(3);
            console.log("Asprov = ", Asprov1);
            $("#display").append("<br>Asprov = ", Asprov1, "mm&#178;");
            barn = Asprov1 / (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0);
            console.log("solution: ", Math.round(barn), "Y", Math.round(dbar));
            $("#display").append("<b><br>Solution: ", Math.round(barn), "<b>Y", Math.round(dbar));
        }
        else if ((Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0) > 1) {
            Asprov = (Asreq / (Math.pow((dbar / 2), 2) * 3.14159265359)).toFixed(0) * (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0);
            console.log("Asprov = ", Asprov);
            console.log(4);
            $("#display").append("<br>Asprov = ", Asprov, "mm&#178;");
            barn = Asprov / (Math.pow((dbar / 2), 2) * 3.14159265359).toFixed(0);
            console.log("Solution: ", Math.round(barn), "Y", Math.round(dbar));
            $("#display").append("<b><br>Solution: ", Math.round(barn), "<b>Y", Math.round(dbar));

        }
    }

};


const calculateshear = (e) => {
    getinputvalue();
    e.preventDefault();
    console.log("Design for Shear");
    $("#display").append("<p><br><b>Design for Shear");
    console.log("BS 8110-1:1997.CL 3.4.5.2");
    $("#display").append("<b>BS 8110-1:1997.CL 3.4.5.2");
    v = (V * 1000) / (b * d);


    if (v < 0.8 * Math.sqrt(fcu)) {
        v = (V * 1000) / (b * d);
        console.log("v = V/bd = ", V * 1000, "/(", b, "&#215;", d, ") = ", v.toFixed(4), "N&#8725;mm&#178;");
        $("#display").append("<br>v = V&#8725;bd = ", V * 1000, "&#8725;(", b, "&#215;", d, ") = ", v.toFixed(4), "N&#8725;mm&#178;");
        displayASPROVContainer();
    } else if (v > 0.8 * Math.sqrt(fcu)) {
        console.log("v > 0.8sqrt(fcu)");
        $("#display").append("<br><b>v > 0.8&#8730;(fcu)");

    }

};



const calculateASPROV = (e) => {
    getinputvalue();
    e.preventDefault();
    console.log("REF: BS 8110-1:1997, TABLE 3.8");
    $("#display").append("<br><b>REF: BS 8110-1:1997, TABLE 3.8");
    a = (100 * ASPROV) / (b * d);
    if (a > 3) {
        a = 1;
        console.log("(100Asprov)/(bd) = ", a);
        $("#display").append("<br>(100Asprov)&#8725;(bd) = ", a);
    } else if (a < 3) {
        a = (100 * ASPROV) / (b * d);
        console.log("(100Asprov)/(bd) = ", a.toFixed(4));
        $("#display").append("<br>(100Asprov)&#8725;(bd) = ", a.toFixed(4));
    }
    c = 400 / d;
    if (c < 1) {
        c = 1;
        console.log("400/d = ", c);
        $("#display").append("<br>400&#8725;d = ", c);
    } else if (c > 1) {
        c = 400 / d;
        console.log("400/d = ", c.toFixed(4));
        $("#display").append("<br>400&#8725;d = ", c.toFixed(4));
    }
    vc = (0.79 * Math.pow((a), (1 / 3)) * Math.pow((c), (1 / 4))) / 1.25;
    console.log("vc = (0.79((100Asprov)/(bd)^(1/3))&#215;((400/d)^(1/4)))/1.25 = 0.79(", a.toFixed(4), ")^(1/3)&#215;(", c.toFixed(4), ")^(1/4)/1.25 = ", vc.toFixed(4), "N/mm^2");
    $("#display").append("<br>vc = (0.79((100Asprov)&#8725;(bd))&frac13;&#215;((400&#8725;d)&frac14;))&#8725;1.25 = 0.79(", a.toFixed(4), ")&frac13;&#215;(", c.toFixed(4), ")&frac14;&#8725;1.25 = ", vc.toFixed(4), "N&#8725;mm&#178;");
    console.log("REF: BS 8110-1:1997, TABLE 3.7");
    $("#display").append("<p><b>REF: BS 8110-1:1997, TABLE 3.7");
    displaySvContainer();
};

const calculateSv = (e) => {
    getinputvalue();
    e.preventDefault();
    console.log("vc= ", vc.toFixed(3));
    console.log("v= ", v.toFixed(3));

    if (v < 0.5 * vc) {
        console.log('v<0.5vc');
        $("#display").append("<b>Minimum links required");
        $("#display").append("<b><br> v is less 0.5vc");
        $("#display").append("<b><br> Asv &#8805; 0.4bSv&#8725;0.95fyv");
        Asv = (0.4 * b * Sv) / (0.95 * fyv);
        console.log("Asv/Sv = (0.4*b)/(0.95*fyv) = (0.4*", b, ")/(0.95*", fyv, ") = ", (Asv / Sv).toFixed(4));
        $("#display").append("<br>Asv&#8725;Sv = (0.4&#215;b)&#8725;(0.95&#215;fyv) = (0.4&#215;", b, ")&#8725;(0.95&#215;", fyv, ") = ", (Asv / Sv).toFixed(4));
        $("#display").append("<br>Asv = (0.4&#215;b&#215;Sv)&#8725;(0.95&#215;fyv) = (0.4&#215;", b, "&#215;", Sv, ")&#8725;(0.95&#215;", fyv, ") = ", (Asv).toFixed(2), "mm&#178;");


    } else if (v >= 0.5 * vc && v <= 0.4 + vc) {
        console.log('0.5*vc<v<(0.4+vc)');
        $("#display").append("<b><br>Minimum links required");
        $("#display").append("<b><br> v is between 0.5vc and vc + 0.4");
        $("#display").append("<b><br> Asv &#8805; 0.4bSv&#8725;0.95fyv");
        Asv = (0.4 * b * Sv) / (0.95 * fyv);
        console.log("Asv/Sv = (0.4&#215;b)(0.95&#215;fyv) = (0.4&#215;", b, ")/(0.95&#215;", fyv, ") = ", (Asv / Sv).toFixed(4));
        $("#display").append("<br>Asv&#8725;Sv = (0.4&#215;b)&#8725;(0.95&#215;fyv) = (0.4&#215;", b, ")&#8725;(0.95&#215;", fyv, ") = ", (Asv / Sv).toFixed(4));
        $("#display").append("<br>Asv = (0.4&#215;b&#215;Sv)&#8725;(0.95&#215;fyv) = (0.4&#215;", b, "&#215;", Sv, ")&#8725;(0.95&#215;", fyv, ") = ", (Asv).toFixed(2), "mm&#178;");

    } else if (v > (0.4 + vc)) {
        console.log('(0.4+vc<v<0.8sqrt(fcu))');
        $("#display").append("<b>Design links required");
        $("#display").append("<b><br> v is between vc + 0.4 and 0.8&#8730;(fcu) ");
        $("#display").append("<b><br> Asv &#8805; bSv(v&#8722;vc)&#8725;0.95fyv");
        Asv = (b * Sv * (v - vc)) / (0.95 * fyv);
        $("#display").append("<br>Asv&#8725;Sv = (b(v&#8722;vc))&#8725;(0.95&#215;fyv) = (", b, "(", v.toFixed(4), "&#8722;", vc.toFixed(4), "))&#8725;(0.95&#215;", fyv, ") = ", (Asv / Sv).toFixed(4));
        $("#display").append("<br>Asv = (b(v&#8722;vc)Sv)&#8725;(0.95&#215;fyv) = (", b, "(", v.toFixed(4), "&#8722;", vc.toFixed(4), ")", Sv, ")&#8725;(0.95&#215;", fyv, ") = ", (Asv).toFixed(2), 'mm&#178;');

    }






};

const calculatedeflection = (e) => {
    getinputvalue();
    e.preventDefault();
    fs = (2 * fyl * Asreq) / (3 * ASPROv);
    $("#display").append("<P><b>Design for Deflection");
    console.log("REF: BS 8110-1:1997.CL. 3.4.7, EQ 8");
    $("#display").append("<b>REF: BS 8110-1:1997.CL. 3.4.7, EQ 8");
    console.log("fs = (2*fyl*Asreq)/(3*Asprov) = (2x", fyl, "x", Asreq.toFixed(1), ")/(3x", ASPROv, ") = ", fs.toFixed(1));
    $("#display").append("<br>fs = (2&#215;fyl&#215;Asreq)&#8725;(3&#215;Asprov) = (2&#215;", fyl, "&#215;", Asreq.toFixed(1), ")&#8725;(3&#215;", ASPROv, ") = ", fs.toFixed(1));
    md = 0.55 + (477 - fs) / (120 * (0.9 + (m * 1000000) / (b * d * d)));
    $("#display").append("<b><br>REF: BS 8110-1:1997.CL. 3.4.7, EQ 7");
    $("#display").append("<br>md = 0.55 + (477 &#8722; fs)&#8725;(120&#215;(0.9+(m&#215;10&#8310;)&#8725;(b&#215;d&#215;d))) = 0.55 + (477 &#8722; ", fs.toFixed(3), ")&#8725;(120&#215;(0.9+(", m, "&#215;10&#8310;)&#8725;(", b, "&#215;", d, "&#215;", d, "))) =", md.toFixed(3));
    if (md >= 2.0) {
        md = 2;
        $("#display").append("<b><br>M.D &#8807; 2.0");
        console.log(2);
        console.log("REF: BS 8110-1:1997.CL. 3.4.7, EQ 7");
        //$("#display").append("<b><br>REF: BS 8110-1:1997.CL. 3.4.7, EQ 7");
        console.log("modification factor = ", md);
        $("#display").append("<br>modification factor = ", md);

    } else if (md < 2.0) {
        md = 0.55 + (477 - fs) / (120 * (0.9 + (m * 1000000) / (b * d * d)));
        console.log(1);
        $("#display").append("<b><br>M.D < 2.0");
        console.log("REF: BS 8110-1:1997.CL. 3.4.7, EQ 7");
        //$("#display").append("<b><br>REF: BS 8110-1:1997.CL. 3.4.7, EQ 7");
        console.log("modification factor = 0.55 + (477 - fs)/(120*(0.9+M/(b*d*d))) = 0.55+(477-", fs.toFixed(1), ")/(120x(0.9+", m, "/(", b, d, "^2) = ", md.toFixed(4));
        $("#display").append("<br>M.D = ", md.toFixed(4));

    }
    const actual = span / d;
    console.log("actual = span&#8725;d = ", span, "&#8725;", d, "= ", actual.toFixed(2));
    $("#display").append("<br>actual = span&#8725;d = ", span, "&#8725;", d, "= ", actual.toFixed(2));

    permissible = (basic / d) * md;
    if (span <= 10000) {
        console.log("REF: BS 8110-1:1997.CL. 3.4.6.3");
        $("#display").append("<br><b>REF: BS 8110-1:1997.CL. 3.4.6.3");
        permissible = (basic) * md;
        console.log("permissible = (basic)M.D = (", basic, ")&times;", md.toFixed(4), " = ", permissible.toFixed(3));
        $("#display").append("<br>permissible = (basic)M.D = (", basic, ")&times;", md.toFixed(4), " = ", permissible.toFixed(3));

    } else if (span > 10000) {
        permissible = (basic * 10) / (span / 1000);
        console.log("REF: BS 8110-1:1997.CL. 3.4.6.4");
        $("#display").append("<br><b>REF: BS 8110-1:1997.CL. 3.4.6.4");
        console.log("Long span");
        console.log("basic&times;10/span = ", permissible.toFixed(3));
        $("#display").append("<br>(basic L&#8725;d &times;10)&#8725;span = (", basic, "&times;10000)&#8725;", span / 1000, "= ", permissible.toFixed(3));

    }
    if (permissible > actual) {
        console.log("permissible > actual, hence condition satisfied for deflection");
        $("#display").append("<br><b>permissible > actual, hence condition satisfied for deflection");

    } else if (permissible < actual) {
        console.log("permissible < actual , hence condition not satisfied for deflection");
        $("#display").append("<br><b>permissible < actual, hence condition not satisfied for deflection");

    }

};


// A $( document ).ready() block.
$(document).ready(function () {
    $("#reset").click(function () {
        $("#display").html('');
    });
});


supportBtn.addEventListener("click", MYsupport);
midspanBtn.addEventListener("click", MYmidspan);
calculateMomentBtn.addEventListener("click", CalculateMoment);
calculateDprimBtn.addEventListener("click", calculateDprim);
calculateDbarBtn.addEventListener("click", calculateDbar);
calculateShearBtn.addEventListener("click", calculateshear);
calculateASPROVBtn.addEventListener("click", calculateASPROV);
calculateSvBtn.addEventListener("click", calculateSv);
calculatedeflectionBTN.addEventListener("click", calculatedeflection);

// steps 
// append moment + add class in moment p tag <p class='moment'><p>
// query select Moment class, variable X, 
// when user re type in moment input field, 
// hide input below moment`
// $(".moment").hide(); 

document.querySelector("#m").onkeypress = function () {
    dprimContainer.style.display = "none";
    dbarContainer.style.display = "none";
};
