findRoots = function(a, b, c) {
	var sigma1, sigma2, omega1, omega2, inn;
	var bSquared = Math.pow(b, 2);
	var ac4 = 4*a*c;
	
	var inners = bSquared - ac4;
	
	if (Math.abs(a) > 0) {
		if (bSquared > ac4) {
			$("#solutionType").text("Distinct Real Roots");
			sigma1 = (-b + Math.sqrt(bSquared - (ac4)))/(2*a);
			sigma2 = (-b - Math.sqrt(bSquared - (ac4)))/(2*a);
			omega1 = 0;
			omega2 = 0;
			type = 1 ;
			if (sigma1 == 0) {
				sigma1 = sigma2;
				sigma2 = 0;
			}
	
		}
	if (bSquared < ac4) {
		$("#solutionType").text("Complex Roots");
		sigma1 = -b/(2*a);
		sigma2 = sigma1;
    
		inner = Math.abs(bSquared - (ac4));
		omega1 = Math.sqrt(inner)/(2*a);
		omega2 = (-1) * omega1;
		type = 2;
	}
	if (bSquared == ac4) {
		$("#solutionType").text("Repeated Real Roots");
		sigma1 = -b/(2*a);
		sigma2 = sigma1;
		omega1 = 0;
		omega2 = 0;
		type = 3;
	}
	} else {
		if (Math.abs(b) > 0) {
			sigma1 = -c/b;
		} else {
			sigma1 = -c;
		}
		sigma2 = 0;
		omega1 = 0;
		omega2 = 0;
		type = 4;
	}
	$("#sigma1").text(sigma1.toFixed(5));
	$("#sigma2").text(sigma2.toFixed(5));
	$("#omega1").text(Math.abs(omega1).toFixed(2));
	$("#omega2").text(Math.abs(omega2).toFixed(2));
	if (omega1 < 0) {
		$("#sign1").text("-");
	} else {
		$("#sign1").text("+");
	}
  
	if (omega2 < 0) {
		$("#sign2").text("-");
	} else {
		$("#sign2").text("+");
	}
  
	var roots = {root1: [sigma1, omega1], root2: [sigma2, omega2], type: type};
	return roots;
};

accountForInitialContitions = function(ic, roots) {
	var a, b, c, d, u, v, constants, sigma, omega, cos1, cos2, sin1, sin2, e1, e2;

	u = ic["output"][0];
	v = ic["output"][1];
  
	if (roots["type"] == 1) {
    	//a = Math.exp(roots["root1"][0] * ic["input"][0]);
        //b = Math.exp(roots["root2"][0] * ic["input"][0]);
        //c = roots["root1"][0] * Math.exp(roots["root1"][0] * ic["input"][1]);
        //d = roots["root2"][0] * Math.exp(roots["root2"][0] * ic["input"][1]);
			
        //constants = solveForConstants(a, b, c, d, u, v);
        var sigma1 = roots["root1"][0];
		var sigma2 = roots["root2"][0];
		var A = (v - (sigma2*u))/(sigma1 - sigma2);
		var B = u - A;
		
		constants = [A, B];
    }
    
    if (roots["type"] == 2) {
		sigma = roots["root1"][0];
		omega = Math.abs(roots["root1"][1]);
		
		cos1 = Math.cos(omega * ic["input"][0]);
		sin1 = Math.sin(omega * ic["input"][0]);
		cos2 = Math.cos(omega * ic["input"][1]);
		sin2 = Math.sin(omega * ic["input"][1]);
		e1 = Math.exp(sigma * ic["input"][0]);
		e2 = Math.exp(sigma * ic["input"][1]);
		
		a = e1*cos1;
		b = e1*sin1;
		c = ((sigma*cos2) - (omega*sin2))*(e2);
		d = ((sigma*sin2) + (omega*cos2))*(e2);
		
		if (ic["input"][0] == 0){
			x = u;
			y = (v - x*sigma)/(omega);
			constants = [x, y];
		} else {
			constants = solveForConstants(a, b, c, d, u, v);
		}
		var sigStr = sigma.toString();
		var omgStr = omega.toString();
		
		var eq1 = "x(t) = e^{";
		var eq2 = "t}(";
		var eq3 = "\\cos(";
		var eq4 = "t) \\sin(";
		var eq5 = "t))";
    }
    
    if (roots["type"] == 3) {
		a = Math.exp(roots["root1"][0] * ic["input"][0]);
		b = Math.exp(roots["root2"][0] * ic["input"][0])*ic["input"][0];
		c = roots["root1"][0] * Math.exp(roots["root1"][0] * ic["input"][1]);
		d = ((roots["root2"][0]*ic["input"][1]) + 1)  * Math.exp(roots["root2"][0] * ic["input"][1]);
		constants = solveForConstants(a, b, c, d, u, v);
    }
	
	if (roots["type"] == 4) {
		var sigma = roots["root1"][0];
		var B = (v-(sigma*u))/(1-sigma);
		var A = u - B;
		constants = [A, B]; 
    }
	
	$("#constant1").text(constants[0].toFixed(8));
	$("#constant2").text(constants[1].toFixed(8));
	
	
    return constants;
};

solveForConstants = function(a, b, c, d, u, v) {
	
	var f, g, y, x;
	constants = [];
	if (Math.abs(a) > Math.abs(c)) {
		f = u * c / a;
		g = b * c / a;
		constants[1] = (v - f) / (d - g);
		constants[0] =(f - g * constants[1]) / c;
	} else {
		f = v * a / c;
		g = d * a / c;
		x = (u - f) / (b - g);
		constants[1] = (f - g * x) / a
		constants[0] = (u - f) / (b - g);
    
	}
  
  /*
  var con = [0.5,0.5];
  
  var i;
  var update0, update1;
  for (i =0; i < 100; i++) {
	  res1 = u - (con[0]*a) - (con[1]*b);
	  res2 = v - (con[0]*c) - (con[1]*d);
	  update0 = -(a*res1) - (b*res2);
	  update1 = -(c*res1) - (d*res2);
	  con[0] = con[0] - update0;
	  con[1] = con[1] - update1;
  }

  return con;
*/
	return constants;
};