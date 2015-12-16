var urlGlobo = 'http://globoesporte.globo.com/servico/semantica/editorias/plantao/futebol/times/';
var urlFox = 'http://www.foxsports.com.br/feeds/times/?teamName=';
var urlUol = 'http://esporte.uol.com.br/futebol/clubes/';

var posfixoGlobo = '/feed.rss';
var posfixoUol = '.xml';
var posfixoFox = '';


for(i in times){
	$('<option id="mov0'+i.toString()+'">'+times[i]+'</option>').appendTo("#sel1");
}

var corTime;
/*
	var i = 0;
	setInterval(function(){
		$(".time > input").attr("placeholder","Ex: "+times[i++]);
		if(i==times.length)i = 0;
	}, 3000);


	var feed = new Instafeed ({ 
	    get :  'tagged' , 
	    tagName :  'awesome' , 
	    clientId : '07fb82d2fea84e99bbe6bf0d1b3c7603',
	}); 
	feed.run(); 
*/


function pegaNoticias(n,url){
	$(function () {
		var urlRss = url;
		$.ajax({
			type: "GET",
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(urlRss),
			dataType: 'json',
			error: function (xhr) {
				var erro = xhr.responseText;
				console.log('Erro ao ler o feed: ' + erro);
			},
			success: function (xml) {
				console.log(xml);
				values = xml.responseData.feed.entries;
				exibeNoticias(values,n);
			}
		});
	});
}







$(".nav-pills > li").click(function(){
	$(".nav-pills > li").removeClass("active");
	$(this).addClass("active");
	$('.so-pane').addClass("hidden");
	$('.'+$(this).attr('data-s')).removeClass("hidden");
});	



$('#seta').click(function(){
	if($('#seta').hasClass("glyphicon glyphicon-menu-up")){
		$('#seta').removeClass("glyphicon glyphicon-menu-up");
		$('#seta').addClass("glyphicon glyphicon-menu-down");
		//$(".painel-noticias").css("display","none");
		$(".painel-noticias").css("height","0px");
		$('#seta').show();

	}
	else{
		$('#seta').removeClass("glyphicon glyphicon-menu-down");
		$('#seta').addClass("glyphicon glyphicon-menu-up");
		$(".painel-noticias").css("display","block");
		//$('.get-noticias > h2').hide();
		$(".painel-noticias").css("height","680px");
	}

});


function exibeNoticias(obj,n){
	console.log(obj);
	var page, color;
	if(n==1){
		page = document.querySelector(".n1");
		color ="success";
	}
	if(n==2) {
		page = document.querySelector(".n2");
		color ="danger";
	}

	if(n==3) {
		page = document.querySelector(".n3");
		color ="info";
	}


	for(var i = 0; i<5;i++){

		div = document.createElement("div");
		div.className = "alert alert-dismissible alert-"+color+" cardNot";

		strong = document.createElement("strong");

		a = document.createElement("a");
		a.textContent = obj[i].title;
		a.href = obj[i].link;
		a.target = "_blank";
		a.className = "alert-link";

		div.appendChild(strong);
		div.appendChild(a);
		page.appendChild(div);
	}
}

function exibeNoticiasUol(obj){
	console.log(obj);
	uol = document.querySelector(".n2");
	/*for(var i = 0; i<5;i++){

		div = document.createElement("div");
		div.className = "alert alert-dismissible alert-danger";

		strong = document.createElement("strong");

		a = document.createElement("a");
		a.textContent = obj[i].title;
		a.href = obj[i].link;
		a.target = "_blank";
		a.className = "alert-link";

		div.appendChild(strong);
		div.appendChild(a);
		uol.appendChild(div);
	}*/
}


$("#ir").click(function(){
	$( "select option:selected" ).each(function() {
	    n = $(this).index();
		pegaNoticias(1,urlGlobo+timesGlobo[n]+posfixoGlobo);
		pegaNoticias(2,urlUol+timesUol[n]+posfixoUol);
		pegaNoticias(3,urlFox+timesFox[n]+posfixoFox);
    });

    $(".social").css("display","block");
    $(".pesquisa").css("top","0%");
    $(".pesquisa").css("transform","translateY(0%)");
    $(".pesquisa").css("height","90px");
    $(".pesquisa").css("padding-top","0");
    $(".pesquisa").css("position","fixed");
    $(".get-noticias").css("display","block");
    $("body").css("margin-top","115px");
    $(".time").hide();
    $(".pesquisa > p").hide();
    $(".pesquisa > h1").text(times[n]);
    $(".pesquisa").addClass("pesquisa-nav");

    getInstagram(jsonT[n][1]);
    getFacebook(jsonT[n][0]);
	
});



$("#voltar").click(function(){
	
    $(".social").css("display","none");
    $(".pesquisa").css("top","50%");
    $(".pesquisa").css("transform","translateY(-50%)");
    $(".pesquisa").css("height","500px");
    $(".pesquisa").css("padding-top","110px");
    $(".pesquisa").css("position","relative");
    $(".get-noticias").css("display","none");
    $("body").css("margin-top","0");
    $(".time").show();
    $(".pesquisa > p").show();
    $(".pesquisa > h1").text("Bem vindo ao Social Fc!");
    $(".pesquisa").removeClass("pesquisa-nav");
    $(".instagram").empty();
    $(".facebook").empty();

	
});



	var lastScroll = 0;
$(window).scroll(function(){

	var scrollTop = $(window).scrollTop();

	if (lastScroll <= scrollTop) {
			$('.pesquisa-nav').css('transform','translateY(-100%)');
		}else{
			$('.pesquisa-nav').css('transform','translateY(0%)');
		}


	lastScroll = scrollTop;
});

