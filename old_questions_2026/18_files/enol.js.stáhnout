$(function(){
	var formatTimeEst=function(a){
		var 
			s=a%60,
			m=Math.floor(a/60)%60,
			h=Math.floor(a/3600)%24,
			d=Math.floor(a/(3600*24))*1,
			z=function(x){return x<10?"0"+x:x;};
		d=(d<=0?"":d+(d==1?" den":d<5?" dny":" dnů"));
		return d+" "+z(h)+":"+z(m)+":"+z(s);
	}
	var timerTick=function(){
		var active=false,now=new Date().getTime();
		$('.countdown').each(function(){
			var r=$(this).attr('rel');
			if(!r)return;
			if(r<=1){
				window.location.reload();
				return;
			}
			$(this).attr('rel',r-1);
			active=true;
			$(this).html("za&nbsp;"+formatTimeEst(r));
			
		});
		if(active)setTimeout(timerTick,1000);
	};
	$('.countdown').first().each(timerTick);
	
});