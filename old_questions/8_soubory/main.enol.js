var lecturers = new Array;
lecturers[1] = {"name" : "Ing. Adéla Holasová",
"school" : "Fakulta elektrotechnická ČVUT v Praze, Katedra ekonomiky, manažerství a humanitních věd",
"field" : "Ekonomika a řízení energetiky",
"thesis" : "V rámci doktorandského studia se zabývá problematikou řízení energetické soustavy (regulační energie, balancování výkonové odchylky) a problematikou energetické gramotnosti. Je vyučující předmětů Ekonomika podnikání a Základy podnikání.",
"contact" : "holasova@egram.cz"};
lecturers[2] = {"name" : "Bc. Martin Chytra",
"school" : "Fakulta elektrotechnická ČVUT v Praze, Katedra ekonomiky, manažerství a humanitních věd",
"field" : "Obor: Ekonomika a řízení energetiky",
"thesis" : "Bakalářská práce: Modernizace kotelny – využití kogenerační jednotky",
"contact" : "chytrma2@fel.cvut.cz"};
lecturers[3] = {"name" : "Bc. Kateřina Ruschaková",
"school" : "Fakulta elektrotechnická ČVUT v Praze, Katedra ekonomiky, manažerství a humanitních věd",
"field" : "",
"thesis" : "Bakalářská práce: Porovnání energetického mixu v Čr a zahraničí",
"contact" : "ruschkat@fel.cvut.cz"};
lecturers[4] = {"name" : "Lukáš Vávra",
"school" : "Fakulta elektrotechniky a informatiky, VŠB-TU Ostrava, katedra Energetiky",
"field" : "Elektroenergetika",
"thesis" : "Bakalářská práce: Programování ochran REF630 a jejich uvádění do provozu v rámci Bakalářské praxe.",
"contact" : "lukasvavra22@gmail.com"};
lecturers[5] = {"name" : "Bc. Matouš Vrzala",
"school" : "Fakulta elektrotechniky a informatiky, VŠB-TU Ostrava, katedra elektroenergetiky",
"field" : "Elektroenergetika, zaměření Elektrické stroje a přístroje",
"thesis" : "",
"contact" : "vrzala.m@seznam.cz"};
lecturers[6] = {"name" : "Jana Ochvatová",
"school" : "Fakulta elektrotechniky a informatiky katedra Elektroenergetiky",
"field" : "Energetika",
"thesis" : "Bakalářská práce: Absolvování odborné praxe ve firmě ABB",
"contact" : "Janaochvatova@seznam.cz"};
lecturers[7] = {"name" : "Ing. Michal Ptáček, Ph.D.",
"school" : "Fakulta elektrotechniky a komunikačních technologií VUT v Brně, Ústav elektroenergetiky",
"field" : "",
"thesis" : "Oblast výzkumu a zájmu: Zabývá se problematikou elektroenergetiky a silnoproudé elektrotechniky, konkrétně pak výpočty, simulacemi a analýzami provozních stavů elektrizačních sítí. Další jeho oblastí zájmu jsou matematické popisy palivových článků, akumulačních zařízení či jednotlivých druhů OZE.",
"contact" : "ptacekm@feec.vutbr.cz"};
lecturers[8] = {"name" : "Ing. Lukáš Radil, Ph.D.",
"school" : "Fakulta elektrotechniky a komunikačních technologií, Ústav elektroenergetiky",
"field" : "Ekonomika a řízení energetiky",
"thesis" : "Název disertační práce: Eliminace diskontinuity dodávky elektrické energie z obnovitelných zdrojů",
"contact" : "radil@vutbr.cz"};
lecturers[9] = {"name" : "Ing. Štěpán Zelman",
"school" : "ZČU v Plzni, Fakulta elektrotechnická, Katedra elektroenergetiky a ekologie",
"field" : "Aplikovaná elektrotechnika",
"thesis" : "Zaměstnání: Specialista legislativní báze a design basis, ČEZ, a.s.",
"contact" : "stepan.zel@gmail.com"};
lecturers[10] = {"name" : "Ing. David Hampl",
"school" : "Fakulta elektrotechnická ČVUT v Praze, Katedra ekonomiky, manažerství a humanitních věd",
"field" : "Ekonomika a řízení energetiky",
"thesis" : "Název disertační práce: Napájení distribuční sítě PREdistribuce, a.s. z nadřazené přenosové soustavy ČEPS, a.s. v dlouhodobé prespektivě.<br>Zaměstnání: ČEPS, a.s., odboru Rozvoj PS",
"contact" : "david@hampl.me"};
lecturers[11] = {"name" : "Ing. Tomáš Mozdřeň",
"school" : "Fakulta elektrotechniky a informatiky, VŠB-TU Ostrava",
"field" : "Katedra elektroenergetiky",
"thesis" : "V rámci doktorandského studia se zabývá problematikou energetiky se zaměřením na problematiku optimalizačních modelů elektroenergetických sítí v programu ATP.",
"contact" : "tom.mozdren@gmail.com"};
lecturers[12] = {"name" : "Ing. Lukáš Radil, Ph.D.",
"school" : "Fakulta elektrotechniky a komunikačních technologií, Ústav elektroenergetiky",
"field" : "Ekonomika a řízení energetiky",
"thesis" : "Název disertační práce: Eliminace diskontinuity dodávky elektrické energie z obnovitelných zdrojů",
"contact" : "radil@vutbr.cz"};

var videos = new Array;
videos[1] = {"link" : "https://www.youtube.com/embed/crh8ArIM_OA","img" : "", "text" : "Energie - úspory v domácnosti"};
videos[2] = {"link" : "https://www.youtube.com/embed/4M4Aoh8IOh4","img" : "", "text" : "Vytápění - konvenční<br>a alternativní způsoby"};
videos[3] = {"link" : "https://www.youtube.com/embed/wX1_7pyEthQ","img" : "", "text" : "Zateplení budovy a efektivní<br> způsoby větrání"};


function randomNumberFromRange(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}


function getLecturerInfo(id, element) {

	var out = '<p class="text-center lecturer-title">'+lecturers[id].name+'</p><p class="lecturer-school text-center">'+lecturers[id].school+'</p><p class="lecturer-school text-center">'+lecturers[id].field+'</p><p class="lecturer-thesis text-center">'+lecturers[id].thesis+'</p><p class="lecturer-contact text-center">'+lecturers[id].contact+'</p>'

	element.attr('data-id', id);
	element.append(out)
}


$(document).ready(function() {

	/* generate random BG */

	var bg = ['bg_01.jpg',
	'bg_02.jpg',
	'bg_03.jpg',
	'bg_04.jpg',
	'bg_05.jpg'];

	var minNumber = 0;
	var maxNumber = 4;

	var i = randomNumberFromRange(minNumber, maxNumber);

	function randomNumberFromRange(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	/* MENU */

	// $('.menu-open').on('click', function() {
	// 	var close = $('.menu-close');
	// 	var open = $('.menu-open');
	// 	var nav = $('.navbar');
	// 	var overlay = $('.menu-overlay');
	// 	close.prop('hidden', false);
	// 	open.prop('hidden', true);
	// 	nav.slideDown('fast');
	// 	overlay.slideDown('fast');
	// });

	$('.menu-close').on('click', function() {
		var close = $('.menu-close');
		var open = $('.menu-open');
		var nav = $('.navbar');
		var overlay = $('.menu-overlay');
		close.prop('hidden', true);
		open.prop('hidden', false);
		nav.slideUp('fast');
		overlay.slideUp('fast');
	});

	/* PARALAX */

	$('.par-bg').parallax({imageSrc: 'static/images/' + bg[i],
		speed: 0.5});

	/* GRID SLIDE */

	$('.grid-img').on('click', function() {
		var lecturerId = $(this).attr('data-id');
		var row = $(this).parent().parent().next('.lecturer-info');
		// $('.grid-img').removeClass('active');
		row.addClass('active');

		if(!row.is(':visible')) { // nerozkliknutá
			row.html('');
			$('.img-overlay').prop('hidden', false);
			$(this).find('.img-overlay').prop('hidden', true);
			$('.arrow-down').hide();
			$(this).find('.arrow-down').show();
			$('.lecturer-info').slideUp();
			getLecturerInfo(lecturerId, row)
			row.slideDown();
		} else {
			if(row.attr('data-id') == lecturerId) { // kliknutí na rozbalenej
				$('.img-overlay').prop('hidden', false);
				row.slideUp();
				$('.arrow-down').hide();
				row.html('');
			} else {
				$('.arrow-down').hide();
				$('.img-overlay').prop('hidden', false);
				$(this).find('.img-overlay').prop('hidden', true);
				$(this).find('.arrow-down').show();
				$('.lecturer-info.active').html('');
				getLecturerInfo(lecturerId, row);	
			}
		}



	})
	$('.video-wrap').on('click', function() {
		var clickedId = $(this).attr('data-id');
		var currentId = $('.video-bg').attr('data-id');
		var currentText = $(this).find('.video-desc');
		var currentVideo = $('.video-bg iframe');
		var currentThumb = $(this).children('.thumb')
		$('.video-bg').attr('data-id', i);
		currentText.text('');
		currentText.append(videos[currentId].text);
		$('.video-bg').attr('data-id', clickedId);
		currentVideo.attr('src', videos[clickedId].link);
		$(this).attr('data-id', currentId);
		currentThumb.removeClass('video-'+clickedId);
		currentThumb.addClass('video-'+currentId);

		$('html, body').animate({
			scrollTop: $(".section-info.info").offset().top
		}, 1000);
		
	});

	$('#scroll-down').click(function(){
		$('html, body').animate({
			scrollTop: $('#scroll-anchor').offset().top - 90
		}, 910);
		return false;
	});

	// YOUTUBE VIDEO WIDTH

	if($('body').width() < 650) {
		$('.video-bg iframe').attr('width', 300);
		$('.video-bg iframe').attr('height', 200);
	} else if($('body').width() < 1000) {
		$('.video-bg iframe').attr('width', 600);
		$('.video-bg iframe').attr('height', 400);
	}

});
