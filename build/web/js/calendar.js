(function($){
	$.fn.calendarizarX= function(opciones){
		var settings = $.extend({
			miclass: null, // clase o clases extra asociadas al elemento
			classCalendario:'calendario-div', // Clase dedafult del calendario
			width:200, // Ancho del calendario
			inicial:0, // Dia en que inicia la semana 0= domingo, 1=lunes, ectétera
			espacioAnios: 60, // Años atrás y adelante en el listado
			diasW: new Array('DOM','LUN','MAR','MIE','JUE','VIE','SAB'), // Array de los días
			mesesM:new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'), // Array delos meses completos
			subMesesM:new Array('ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'), // Array de los meses abreviados
			dato1:'', // Cualquier dato
			miTexto: null,
			onSelected: function(fecha){ // event onSelected
				
			}
		},opciones||{});

		var meteValores = function(fech, elDia, elMes, elAnio){
			var fechaT = fech.split('-');
			var aa= Number(fechaT[0]);
			var mm= Number(fechaT[1]);
			var dd= Number(fechaT[2]);
			if (mm<10){
				mm= "0" + mm;
			}
			if (dd<10){
				dd= "0" + dd;
			}
			elDia.val(dd);
			elMes.val(mm);
			elAnio.val(aa);
		};

		this.each(function(){
			// El asunto de los inpts
			//echo('X');
			var elDia = $('<input type="text" class="w20 center" name="es-el-dia" id="es-el-dia" onkeypress="return esNum(event)" maxlength="2" placeholder="DD">');
			var elMes = $('<input type="text" class="w20 center" name="es-el-mes" id="es-el-mes" onkeypress="return esNum(event)" maxlength="2" placeholder="MM">');
			var elAnio = $('<input type="text" class="w50 center" name="es-el-anio" id="es-el-anio" onkeypress="return esNum(event)" maxlength="4" placeholder="AAAA">');
			var callToCal = $('<a href="#" class="call-to-cal"></a>');
			//var limpiar = $('<div class="limpiar call-to-nota">DD / MM / AAAA</div>');
			var limpiar = $('<div class="limpiar"></div>');
			var conjuntoInpts = $('<div>').addClass('son-los-inpts').append(elDia).append(elMes).append(elAnio).append(callToCal).append(limpiar);
			var preEste = $(this);
			var elFechaInpt = '';
			callToCal.click(function(e){
				preEste.removeClass('oculto').click();
				e.preventDefault();
				preEste.addClass('oculto');
			});
			elDia.change(function(){
				var elDiaV = elDia.val();
				var elMesV = elMes.val();
				var elAnioV = elAnio.val();
				if (elDiaV != '' && elMesV != '' && elAnioV != '') {
					var laFechaV = elAnioV + '-' + elMesV + '-' + elDiaV;
					preEste.val(laFechaV);
					if (settings.onSelected !== undefined) {
						settings.onSelected(laFechaV);
					}
				} else {
					preEste.val('');
					if (settings.onSelected !== undefined) {
						settings.onSelected('');
					}
				}
			});
			elMes.change(function(){
				var elDiaV = elDia.val();
				var elMesV = elMes.val();
				var elAnioV = elAnio.val();
				if (elDiaV != '' && elMesV != '' && elAnioV != '') {
					var laFechaV = elAnioV + '-' + elMesV + '-' + elDiaV;
					preEste.val(laFechaV);
					if (settings.onSelected !== undefined) {
						settings.onSelected(laFechaV);
					}
				} else {
					preEste.val('');
					if (settings.onSelected !== undefined) {
						settings.onSelected('');
					}
				}
			});
			elAnio.change(function(){
				var elDiaV = elDia.val();
				var elMesV = elMes.val();
				var elAnioV = elAnio.val();
				if (elDiaV != '' && elMesV != '' && elAnioV != '') {
					var laFechaV = elAnioV + '-' + elMesV + '-' + elDiaV;
					preEste.val(laFechaV);
					if (settings.onSelected !== undefined) {
						settings.onSelected(laFechaV);
					}
				} else {
					preEste.val('');
					if (settings.onSelected !== undefined) {
						settings.onSelected('');
					}
				}
			});
			if (preEste.val()!= ''){
				meteValores(preEste.val(), elDia, elMes, elAnio);
			}
			$(this).addClass('oculto').before(conjuntoInpts);
			$(this).attr('readonly','readonly').click(function(){// El input
				borrarCal();
				var $este = $(this); // EL inpt
				var $superEste = $(this);
				var id = $este.attr('id');
				var fecha = $este.val();
				var left = $este.position().left;
				var anchoDM = settings.width - 44;
				var largoDiasW = settings.diasW.length;
				var anchoDias = settings.width/largoDiasW;
				var $div = $('<div>').attr('id','calendario-cal').addClass(settings.classCalendario).width(settings.width).css('left',left).css('position','absolute').addClass(settings.miclass).hide();
				var $anioMes = $('<div>').html('<div id="calendario-prev"></div><div id="calendario-mes"></div><div id="calendario-sigue">').addClass('calendario-titulo');
				var $diasSemana = $('<div id="calendario-semana">');
				var $diasMes= $('<div id="calendario-dias-mes">');
				var $divLimpio= $('<div class="calendario-limpia">');
				var $cerrar = $('<div>').html('CERRAR').attr('id','calendario-cerrar');
				var iDia = settings.inicial;
				$este.before($div);
				$div.append($anioMes).append($diasSemana).append($divLimpio).append($diasMes).append($divLimpio).append($cerrar).find('#calendario-mes').width(anchoDM);
				$('#calendario-semana').width(settings.width);
				$.each(settings.diasW,function(){
					var iDiaEs = iDia >= largoDiasW ? 0 : iDia++;
					$('<div>').width(anchoDias).html(settings.diasW[iDiaEs]).appendTo('#calendario-semana');
				});
				$('#calendario-cal').generarCal(fecha, $este, elDia, elMes, elAnio).show().addClass('calendario-liga').click(function(){
					return false;
				});
				$('#calendario-cerrar').addClass('calendario-liga').click(function(){
					borrarCal();
					return false;
				});
			});
		});
		$.fn.generarCal = function(fecha,inptD, elDia, elMes, elAnio){
			this.each(function(){
				var $este= $(this);
				var $superEste= $(this).parent();
				var anchoDias = settings.width/7;
				var laFecha = fecha == null || fecha =="" || fecha =="0000-00-00" ?  new Date() : stringToDate(fecha);
				var laFechPrevM = new Date(laFecha);
				laFechPrevM.setMonth(laFecha.getMonth()-1);
				var laFechSigueM = new Date(laFecha);
				laFechSigueM.setMonth(laFecha.getMonth()+1);
				//var tituloMesAnio = settings.mesesM[laFecha.getMonth()] + ' ' + laFecha.getFullYear();
				var tituloMesAnio = '<span class="cal-texto-mes" id="' + laFecha.getMonth() + '">' + settings.mesesM[laFecha.getMonth()] + '</span> <span class="cal-texto-anio" id="' + laFecha.getFullYear() + '">' + laFecha.getFullYear() + '</span>';
				var laFechaDia1 = new Date(laFecha);
				laFechaDia1.setDate(1);
				laFechaDia1.setDate(1-(7 + laFechaDia1.getDay()-settings.inicial)%7);
				var diaHoy = new Date(laFechaDia1);
				$este.find('#calendario-dias-mes').html('');
				while (diaHoy.getMonth() == laFecha.getMonth() || diaHoy.getMonth() == laFechaDia1.getMonth()) {
					for (var semana_hoy_dia=0; semana_hoy_dia<7; semana_hoy_dia++) {
						if (diaHoy.getDate() == laFecha.getDate() && diaHoy.getMonth() == laFecha.getMonth()){
							if (diaHoy.getMonth() == laFecha.getMonth()){
								var unDiv= $('<div class="calendario-dia-hoy" id="' + dateToString(diaHoy) + '">' + diaHoy.getDate()+'</div>');
							}
						} else {
							if (diaHoy.getMonth() == laFecha.getMonth()){
								var unDiv= $('<div class="calendario-dia-x" id="' + dateToString(diaHoy) + '">' + diaHoy.getDate() + '</div>');
							} else {
								var unDiv= $('<div>&nbsp;</div>');
							}
						}
						$este.find('#calendario-dias-mes').append(unDiv);
						diaHoy.setDate(diaHoy.getDate()+1);
					}
				}
				$este.find('#calendario-mes').html('').append(tituloMesAnio).end().find('#calendario-dias-mes').find('div').each(function(){
					$(this).width(anchoDias);
				});
				$este.find('#calendario-dias-mes').find('div.calendario-dia-x').each(function(){
					$(this).addClass('calendario-liga').click(function(){
						var superSuper = $(this).parent().parent().parent();
						var nuevaFecha= $(this).attr('id');
						// Asigna valores
						inptD.val(nuevaFecha);
						meteValores(nuevaFecha, elDia, elMes, elAnio);
						borrarCal();
						if (settings.onSelected !== undefined) {
							settings.onSelected(nuevaFecha);
						}
						return false;
					});
				});
				$este.find('#calendario-dias-mes').find('div.calendario-dia-hoy').each(function(){
					$(this).addClass('calendario-liga').click(function(){
						var superSuper = $(this).parent().parent().parent();
						var nuevaFecha= $(this).attr('id');
						inptD.val(nuevaFecha);
						meteValores(nuevaFecha, elDia, elMes, elAnio);
						borrarCal();
						if (settings.onSelected !== undefined) {
							settings.onSelected(nuevaFecha, $este);
						}
						return false;
					});
				});
				$este.find('#calendario-prev').unbind('click').addClass('calendario-liga').click(function(){
					$este.generarCal(dateToString(laFechPrevM),inptD, elDia, elMes, elAnio);
					return false;
				});
				$este.find('#calendario-sigue').unbind('click').addClass('calendario-liga').click(function(){
					$este.generarCal(dateToString(laFechSigueM),inptD, elDia, elMes, elAnio);
					return false;
				});
				$este.find('#calendario-mes span.cal-texto-anio').click(function(){
					var yoCtrl = $(this);
					var dat = yoCtrl.attr('id');
					var anioSelect = generaListaAnual(dat);
					yoCtrl.hide().after(anioSelect);
					anioSelect.focus().blur(function(){
						yoCtrl.show();
						anioSelect.remove();
					});
					anioSelect.change(function(){
						var elegido = $(this).val();
						var elOtroElegido = $este.find('#calendario-mes span.cal-texto-mes').attr('id');
						var laFechaSalta = new Date(laFecha);
						laFechaSalta.setFullYear(elegido);
						laFechaSalta.setMonth(elOtroElegido);
						$este.generarCal(dateToString(laFechaSalta),inptD, elDia, elMes, elAnio);
					});
				});
				$este.find('#calendario-mes span.cal-texto-mes').click(function(){
					var yoCtrl = $(this);
					var dat = yoCtrl.attr('id');
					var mesSelect = generaListaMensual(dat);
					yoCtrl.hide().after(mesSelect);
					mesSelect.focus().blur(function(){
						yoCtrl.show();
						mesSelect.remove();
					});
					mesSelect.change(function(){
						var elegido = $(this).val();
						var elOtroElegido = $este.find('#calendario-mes span.cal-texto-anio').attr('id');
						var laFechaSalta = new Date(laFecha);
						laFechaSalta.setMonth(elegido);
						laFechaSalta.setFullYear(elOtroElegido);
						$este.generarCal(dateToString(laFechaSalta),inptD, elDia, elMes, elAnio);
					});
				});
			});
			return this;
		};
		var generaListaAnual = function(este){
			var sElect = $('<select>').attr('id','selAnio');
			var este = Number(este);
			var atras = este - settings.espacioAnios;
			var hoyFA = new Date();
			var adelante = hoyFA.getFullYear() /*+ settings.espacioAnios*/;
			for (var i= atras; i<=adelante; i++){
				var sel = i==este ? ' selected="selected"' : '';
				var opt = $('<option' + sel + '>').attr('value',i).text(i);
				sElect.append(opt);
			}
			return sElect;			
		};
		var generaListaMensual = function(este){
			var sElect = $('<select>').attr('id','selAnio');
			var este = Number(este);
			var atras = este - settings.espacioAnios;
			var adelante = este + settings.espacioAnios;
			var meses = settings.mesesM.length;
			for (var i= 0; i<meses; i++){
				var sel = i==este ? ' selected="selected"' : '';
				var opt = $('<option' + sel + '>').attr('value',i).text(settings.mesesM[i]);
				sElect.append(opt);
			}
			return sElect;			
		};
		var borrarCal= function(){
			if($('#calendario-cal') != null){
				$('#calendario-cal').remove();
			}
		};
		var stringToDate = function(fch) {
			var re_date = /^(\d+)\-(\d+)\-(\d+)$/;
			if (!re_date.exec(fch))
				return new Date();
			 else
				return (new Date (RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6));
		};
		var dateToString = function(fech) {
			var aa= fech.getFullYear();
			var mm= fech.getMonth()+1;
			var dd= fech.getDate();
			if (mm<10){
				mm= "0" + mm;
			}
			if (dd<10){
				dd= "0" + dd;
			}
			var estafecha=  aa + "-" + mm + "-" + dd;
			return estafecha;
		};
		var dateToStringDiv= function(fech){
			var fechas = fech.split('-');
			return Number(fechas[2]) + '/' + settings.subMesesM[Number(fechas[1])-1] + '/' + Number(fechas[0]);
		};
		return this;
	};
})(jQuery);


(function($){
	$.fn.calendarizar= function(opciones){
		var settings = $.extend({
			miclass: null, // clase o clases extra asociadas al elemento
			classCalendario:'calendario-div', // Clase dedafult del calendario
			width:200, // Ancho del calendario
			inicial:0, // Dia en que inicia la semana 0= domingo, 1=lunes, ectétera
			espacioAnios: 60, // Años atrás y adelante en el listado
			diasW: new Array('DOM','LUN','MAR','MIE','JUE','VIE','SAB'), // Array de los días
			mesesM:new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'), // Array delos meses completos
			subMesesM:new Array('ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'), // Array de los meses abreviados
			dato1:'', // Cualquier dato
			miTexto: null,
			onSelected: function(fecha){ // event onSelected
				
			}
		},opciones||{});
		this.each(function(){				
			$(this).attr('readonly','readonly').click(function(){
				borrarCal();
				var $este = $(this);
				var $superEste = $(this);
				var id = $este.attr('id');
				var fecha = $este.val();
				var left = $este.position().left;
				var anchoDM = settings.width - 44;
				var largoDiasW = settings.diasW.length;
				var anchoDias = settings.width/largoDiasW;
				var $div = $('<div>').attr('id','calendario-cal').addClass(settings.classCalendario).width(settings.width).css('left',left).css('position','absolute').addClass(settings.miclass).hide();
				var $anioMes = $('<div>').html('<div id="calendario-prev"></div><div id="calendario-mes"></div><div id="calendario-sigue">').addClass('calendario-titulo');
				var $diasSemana = $('<div id="calendario-semana">');
				var $diasMes= $('<div id="calendario-dias-mes">');
				var $divLimpio= $('<div class="calendario-limpia">');
				var $cerrar = $('<div>').html('CERRAR').attr('id','calendario-cerrar');
				var iDia = settings.inicial;
				$este.before($div);
				$div.append($anioMes).append($diasSemana).append($divLimpio).append($diasMes).append($divLimpio).append($cerrar).find('#calendario-mes').width(anchoDM);
				$('#calendario-semana').width(settings.width);
				$.each(settings.diasW,function(){
					var iDiaEs = iDia >= largoDiasW ? 0 : iDia++;
					$('<div>').width(anchoDias).html(settings.diasW[iDiaEs]).appendTo('#calendario-semana');
				});
				$('#calendario-cal').generarCal(fecha, $este).show().addClass('calendario-liga').click(function(){
					return false;
				});
				$('#calendario-cerrar').addClass('calendario-liga').click(function(){
					borrarCal();
					return false;
				});
			});
		});
		$.fn.generarCal = function(fecha,inptD){
			this.each(function(){
				var $este= $(this);
				var $superEste= $(this).parent();
				var anchoDias = settings.width/7;
				var laFecha = fecha == null || fecha =="" || fecha =="0000-00-00" ?  new Date() : stringToDate(fecha);
				var laFechPrevM = new Date(laFecha);
				laFechPrevM.setMonth(laFecha.getMonth()-1);
				var laFechSigueM = new Date(laFecha);
				laFechSigueM.setMonth(laFecha.getMonth()+1);
				//var tituloMesAnio = settings.mesesM[laFecha.getMonth()] + ' ' + laFecha.getFullYear();
				var tituloMesAnio = '<span class="cal-texto-mes" id="' + laFecha.getMonth() + '">' + settings.mesesM[laFecha.getMonth()] + '</span> <span class="cal-texto-anio" id="' + laFecha.getFullYear() + '">' + laFecha.getFullYear() + '</span>';
				var laFechaDia1 = new Date(laFecha);
				laFechaDia1.setDate(1);
				laFechaDia1.setDate(1-(7 + laFechaDia1.getDay()-settings.inicial)%7);
				var diaHoy = new Date(laFechaDia1);
				$este.find('#calendario-dias-mes').html('');
				while (diaHoy.getMonth() == laFecha.getMonth() || diaHoy.getMonth() == laFechaDia1.getMonth()) {
					for (var semana_hoy_dia=0; semana_hoy_dia<7; semana_hoy_dia++) {
						if (diaHoy.getDate() == laFecha.getDate() && diaHoy.getMonth() == laFecha.getMonth()){
							if (diaHoy.getMonth() == laFecha.getMonth()){
								var unDiv= $('<div class="calendario-dia-hoy" id="' + dateToString(diaHoy) + '">' + diaHoy.getDate()+'</div>');
							}
						} else {
							if (diaHoy.getMonth() == laFecha.getMonth()){
								var unDiv= $('<div class="calendario-dia-x" id="' + dateToString(diaHoy) + '">' + diaHoy.getDate() + '</div>');
							} else {
								var unDiv= $('<div>&nbsp;</div>');
							}
						}
						$este.find('#calendario-dias-mes').append(unDiv);
						diaHoy.setDate(diaHoy.getDate()+1);
					}
				}
				$este.find('#calendario-mes').html('').append(tituloMesAnio).end().find('#calendario-dias-mes').find('div').each(function(){
					$(this).width(anchoDias);
				});
				$este.find('#calendario-dias-mes').find('div.calendario-dia-x').each(function(){
					$(this).addClass('calendario-liga').click(function(){
						var superSuper = $(this).parent().parent().parent();
						var nuevaFecha= $(this).attr('id');
						inptD.val(nuevaFecha);
						borrarCal();
						if (settings.onSelected !== undefined) {
						   settings.onSelected(nuevaFecha);
						}
						return false;
					});
				});
				$este.find('#calendario-dias-mes').find('div.calendario-dia-hoy').each(function(){
					$(this).addClass('calendario-liga').click(function(){
						var superSuper = $(this).parent().parent().parent();
						var nuevaFecha= $(this).attr('id');
						inptD.val(nuevaFecha);
						borrarCal();
						if (settings.onSelected !== undefined) {
						   settings.onSelected(nuevaFecha, $este);
						}
						return false;
					});
				});
				$este.find('#calendario-prev').unbind('click').addClass('calendario-liga').click(function(){
					$este.generarCal(dateToString(laFechPrevM),inptD);
					return false;
				});
				$este.find('#calendario-sigue').unbind('click').addClass('calendario-liga').click(function(){
					$este.generarCal(dateToString(laFechSigueM),inptD);
					return false;
				});
				$este.find('#calendario-mes span.cal-texto-anio').click(function(){	
					var yoCtrl = $(this);
					var dat = yoCtrl.attr('id');
					var anioSelect = generaListaAnual(dat);
					yoCtrl.hide().after(anioSelect);
					anioSelect.focus().blur(function(){
						yoCtrl.show();
						anioSelect.remove();
					});
					anioSelect.change(function(){
						var elegido = $(this).val();
						var elOtroElegido = $este.find('#calendario-mes span.cal-texto-mes').attr('id');
						var laFechaSalta = new Date(laFecha);
						laFechaSalta.setFullYear(elegido);
						laFechaSalta.setMonth(elOtroElegido);
						$este.generarCal(dateToString(laFechaSalta),inptD);
					});
				});				
				$este.find('#calendario-mes span.cal-texto-mes').click(function(){
					var yoCtrl = $(this);
					var dat = yoCtrl.attr('id');
					var mesSelect = generaListaMensual(dat);
					yoCtrl.hide().after(mesSelect);
					mesSelect.focus().blur(function(){
						yoCtrl.show();
						mesSelect.remove();
					});
					mesSelect.change(function(){
						var elegido = $(this).val();
						var elOtroElegido = $este.find('#calendario-mes span.cal-texto-anio').attr('id');
						var laFechaSalta = new Date(laFecha);
						laFechaSalta.setMonth(elegido);
						laFechaSalta.setFullYear(elOtroElegido);
						$este.generarCal(dateToString(laFechaSalta),inptD);
					});
				});
			});
			return this;
		}
		var generaListaAnual = function(este){
			var sElect = $('<select>').attr('id','selAnio');
			var este = Number(este);
			var atras = este - settings.espacioAnios;
			var hoyFA = new Date();
			var adelante = hoyFA.getFullYear() /*+ settings.espacioAnios*/;
			for (var i= atras; i<=adelante; i++){
				var sel = i==este ? ' selected="selected"' : '';
				var opt = $('<option' + sel + '>').attr('value',i).text(i);
				sElect.append(opt);
			}
			return sElect;			
		}
		var generaListaMensual = function(este){
			var sElect = $('<select>').attr('id','selAnio');
			var este = Number(este);
			var atras = este - settings.espacioAnios;
			var adelante = este + settings.espacioAnios;
			var meses = settings.mesesM.length;
			for (var i= 0; i<meses; i++){
				var sel = i==este ? ' selected="selected"' : '';
				var opt = $('<option' + sel + '>').attr('value',i).text(settings.mesesM[i]);
				sElect.append(opt);
			}
			return sElect;			
		}		
		var borrarCal= function(){
			if($('#calendario-cal') != null){
				$('#calendario-cal').remove();
			}
		}
		var stringToDate = function(fch) {
			var re_date = /^(\d+)\-(\d+)\-(\d+)$/;
			if (!re_date.exec(fch))
				return new Date();
			 else
				return (new Date (RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6));
		}
		var dateToString = function(fech) {
			var aa= fech.getFullYear();
			var mm= fech.getMonth()+1;
			var dd= fech.getDate();
			if (mm<10){
				mm= "0" + mm;
			}
			if (dd<10){
				dd= "0" + dd;
			}
			var estafecha=  aa + "-" + mm + "-" + dd;
			return estafecha;
		}	
		var dateToStringDiv= function(fech){
			var fechas = fech.split('-');
			return Number(fechas[2]) + '/' + settings.subMesesM[Number(fechas[1])-1] + '/' + Number(fechas[0]);
		}				
		return this;
	};
})(jQuery);

(function($){
	$.fn.calendarizarB= function(opciones){
		var settings = $.extend({
			miclass: null, // clase o clases extra asociadas al elemento
			classCalendario:'calendario-div', // Clase dedafult del calendario
			width:200, // Ancho del calendario
			inicial:0, // Dia en que inicia la semana 0= domingo, 1=lunes, ectétera
			espacioAnios: 60, // Años atrás y adelante en el listado
			diasW: new Array('DOM','LUN','MAR','MIE','JUE','VIE','SAB'), // Array de los días
			mesesM:new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'), // Array delos meses completos
			subMesesM:new Array('ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'), // Array de los meses abreviados
			dato1:'', // Cualquier dato
			miTexto: null,
			onSelucted: function(fecha){ // event onSelected
				
			}
		},opciones||{});
		this.each(function(){				
			$(this).attr('readonly','readonly').click(function(){
				borrarCal();
				var $este = $(this);
				var $superEste = $(this);
				var id = $este.attr('id');
				var fecha = $este.val();
				var left = $este.position().left;
				var anchoDM = settings.width - 44;
				var largoDiasW = settings.diasW.length;
				var anchoDias = settings.width/largoDiasW;
				var $div = $('<div>').attr('id','calendario-cal').addClass(settings.classCalendario).width(settings.width).css('left',left).css('position','absolute').addClass(settings.miclass).hide();
				var $anioMes = $('<div>').html('<div id="calendario-prev"></div><div id="calendario-mes"></div><div id="calendario-sigue">').addClass('calendario-titulo');
				var $diasSemana = $('<div id="calendario-semana">');
				var $diasMes= $('<div id="calendario-dias-mes">');
				var $divLimpio= $('<div class="calendario-limpia">');
				var $cerrar = $('<div>').html('CERRAR').attr('id','calendario-cerrar');
				var iDia = settings.inicial;
				$este.before($div);
				$div.append($anioMes).append($diasSemana).append($divLimpio).append($diasMes).append($divLimpio).append($cerrar).find('#calendario-mes').width(anchoDM);
				$('#calendario-semana').width(settings.width);
				$.each(settings.diasW,function(){
					var iDiaEs = iDia >= largoDiasW ? 0 : iDia++;
					$('<div>').width(anchoDias).html(settings.diasW[iDiaEs]).appendTo('#calendario-semana');
				});
				$('#calendario-cal').generarCalB(fecha, $este).show().addClass('calendario-liga').click(function(){
					return false;
				});
				$('#calendario-cerrar').addClass('calendario-liga').click(function(){
					borrarCal();
					return false;
				});
			});
		});
		$.fn.generarCalB = function(fecha,inptD){
			this.each(function(){
				var $este= $(this);
				var $superEste= $(this).parent();
				var anchoDias = settings.width/7;
				var laFecha = fecha == null || fecha =="" || fecha =="0000-00-00" ?  new Date() : stringToDate(fecha);
				var laFechPrevM = new Date(laFecha);
				laFechPrevM.setMonth(laFecha.getMonth()-1);
				var laFechSigueM = new Date(laFecha);
				laFechSigueM.setMonth(laFecha.getMonth()+1);
				//var tituloMesAnio = settings.mesesM[laFecha.getMonth()] + ' ' + laFecha.getFullYear();
				var tituloMesAnio = '<span class="cal-texto-mes" id="' + laFecha.getMonth() + '">' + settings.mesesM[laFecha.getMonth()] + '</span> <span class="cal-texto-anio" id="' + laFecha.getFullYear() + '">' + laFecha.getFullYear() + '</span>';
				var laFechaDia1 = new Date(laFecha);
				laFechaDia1.setDate(1);
				laFechaDia1.setDate(1-(7 + laFechaDia1.getDay()-settings.inicial)%7);
				var diaHoy = new Date(laFechaDia1);
				$este.find('#calendario-dias-mes').html('');
				while (diaHoy.getMonth() == laFecha.getMonth() || diaHoy.getMonth() == laFechaDia1.getMonth()) {
					for (var semana_hoy_dia=0; semana_hoy_dia<7; semana_hoy_dia++) {
						if (diaHoy.getDate() == laFecha.getDate() && diaHoy.getMonth() == laFecha.getMonth()){
							if (diaHoy.getMonth() == laFecha.getMonth()){
								var unDiv= $('<div class="calendario-dia-hoy" id="' + dateToString(diaHoy) + '">' + diaHoy.getDate()+'</div>');
							}
						} else {
							if (diaHoy.getMonth() == laFecha.getMonth()){
								var unDiv= $('<div class="calendario-dia-x" id="' + dateToString(diaHoy) + '">' + diaHoy.getDate() + '</div>');
							} else {
								var unDiv= $('<div>&nbsp;</div>');
							}
						}
						$este.find('#calendario-dias-mes').append(unDiv);
						diaHoy.setDate(diaHoy.getDate()+1);
					}
				}
				$este.find('#calendario-mes').html('').append(tituloMesAnio).end().find('#calendario-dias-mes').find('div').each(function(){
					$(this).width(anchoDias);
				});
				$este.find('#calendario-dias-mes').find('div.calendario-dia-x').each(function(){
					$(this).addClass('calendario-liga').click(function(){
						var superSuper = $(this).parent().parent().parent();
						var nuevaFecha= $(this).attr('id');
						inptD.val(nuevaFecha);
						borrarCal();
						if (settings.onSelucted !== undefined) {
						   settings.onSelucted(nuevaFecha);
						}
						return false;
					});
				});
				$este.find('#calendario-dias-mes').find('div.calendario-dia-hoy').each(function(){
					$(this).addClass('calendario-liga').click(function(){
						var superSuper = $(this).parent().parent().parent();
						var nuevaFecha= $(this).attr('id');
						inptD.val(nuevaFecha);
						borrarCal();
						if (settings.onSelucted !== undefined) {
							//echo('Selucted');
						   settings.onSelucted(nuevaFecha);
						}
						return false;
					});
				});
				$este.find('#calendario-prev').unbind('click').addClass('calendario-liga').click(function(){
					$este.generarCalB(dateToString(laFechPrevM),inptD);
					return false;
				});
				$este.find('#calendario-sigue').unbind('click').addClass('calendario-liga').click(function(){
					$este.generarCalB(dateToString(laFechSigueM),inptD);
					return false;
				});
				$este.find('#calendario-mes span.cal-texto-anio').click(function(){	
					var yoCtrl = $(this);
					var dat = yoCtrl.attr('id');
					var anioSelect = generaListaAnual(dat);
					yoCtrl.hide().after(anioSelect);
					anioSelect.focus().blur(function(){
						yoCtrl.show();
						anioSelect.remove();
					});
					anioSelect.change(function(){
						var elegido = $(this).val();
						var elOtroElegido = $este.find('#calendario-mes span.cal-texto-mes').attr('id');
						var laFechaSalta = new Date(laFecha);
						laFechaSalta.setFullYear(elegido);
						laFechaSalta.setMonth(elOtroElegido);
						$este.generarCalB(dateToString(laFechaSalta),inptD);
					});
				});				
				$este.find('#calendario-mes span.cal-texto-mes').click(function(){
					var yoCtrl = $(this);
					var dat = yoCtrl.attr('id');
					var mesSelect = generaListaMensual(dat);
					yoCtrl.hide().after(mesSelect);
					mesSelect.focus().blur(function(){
						yoCtrl.show();
						mesSelect.remove();
					});
					mesSelect.change(function(){
						var elegido = $(this).val();
						var elOtroElegido = $este.find('#calendario-mes span.cal-texto-anio').attr('id');
						var laFechaSalta = new Date(laFecha);
						laFechaSalta.setMonth(elegido);
						laFechaSalta.setFullYear(elOtroElegido);
						$este.generarCalB(dateToString(laFechaSalta),inptD);
					});
				});
			});
			return this;
		}
		var generaListaAnual = function(este){
			var sElect = $('<select>').attr('id','selAnio');
			var este = Number(este);
			var atras = este - settings.espacioAnios;
			var hoyFA = new Date();
			var adelante = hoyFA.getFullYear() /*+ settings.espacioAnios*/;
			for (var i= atras; i<=adelante; i++){
				var sel = i==este ? ' selected="selected"' : '';
				var opt = $('<option' + sel + '>').attr('value',i).text(i);
				sElect.append(opt);
			}
			return sElect;			
		}
		var generaListaMensual = function(este){
			var sElect = $('<select>').attr('id','selAnio');
			var este = Number(este);
			var atras = este - settings.espacioAnios;
			var adelante = este + settings.espacioAnios;
			var meses = settings.mesesM.length;
			for (var i= 0; i<meses; i++){
				var sel = i==este ? ' selected="selected"' : '';
				var opt = $('<option' + sel + '>').attr('value',i).text(settings.mesesM[i]);
				sElect.append(opt);
			}
			return sElect;			
		}		
		var borrarCal= function(){
			if($('#calendario-cal') != null){
				$('#calendario-cal').remove();
			}
		}
		var stringToDate = function(fch) {
			var re_date = /^(\d+)\-(\d+)\-(\d+)$/;
			if (!re_date.exec(fch))
				return new Date();
			 else
				return (new Date (RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6));
		}
		var dateToString = function(fech) {
			var aa= fech.getFullYear();
			var mm= fech.getMonth()+1;
			var dd= fech.getDate();
			if (mm<10){
				mm= "0" + mm;
			}
			if (dd<10){
				dd= "0" + dd;
			}
			var estafecha=  aa + "-" + mm + "-" + dd;
			return estafecha;
		}	
		var dateToStringDiv= function(fech){
			var fechas = fech.split('-');
			return Number(fechas[2]) + '/' + settings.subMesesM[Number(fechas[1])-1] + '/' + Number(fechas[0]);
		}				
		return this;
	};
})(jQuery);


(function($){
	$.fn.calendarizarC= function(opciones){
		var settings = $.extend({
			miclass: null, // clase o clases extra asociadas al elemento
			classCalendario:'calendario-div', // Clase dedafult del calendario
			width:200, // Ancho del calendario
			inicial:0, // Dia en que inicia la semana 0= domingo, 1=lunes, ectétera
			espacioAnios: 60, // Años atrás y adelante en el listado
			diasW: new Array('DOM','LUN','MAR','MIE','JUE','VIE','SAB'), // Array de los días
			mesesM:new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'), // Array delos meses completos
			subMesesM:new Array('ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'), // Array de los meses abreviados
			dato1:'', // Cualquier dato
			miTexto: null,
			onSelucted: function(fecha){ // event onSelected
				
			}
		},opciones||{});
		this.each(function(){				
			$(this).attr('readonly','readonly').click(function(){
				borrarCal();
				var $este = $(this);
				var $superEste = $(this);
				var id = $este.attr('id');
				var fecha = $este.val();
				var left = $este.position().left;
				var anchoDM = settings.width - 44;
				var largoDiasW = settings.diasW.length;
				var anchoDias = settings.width/largoDiasW;
				var $div = $('<div>').attr('id','calendario-cal').addClass(settings.classCalendario).width(settings.width).css('left',left).css('position','absolute').addClass(settings.miclass).hide();
				var $anioMes = $('<div>').html('<div id="calendario-prev"></div><div id="calendario-mes"></div><div id="calendario-sigue">').addClass('calendario-titulo');
				var $diasSemana = $('<div id="calendario-semana">');
				var $diasMes= $('<div id="calendario-dias-mes">');
				var $divLimpio= $('<div class="calendario-limpia">');
				var $cerrar = $('<div>').html('CERRAR').attr('id','calendario-cerrar');
				var iDia = settings.inicial;
				$este.before($div);
				$div.append($anioMes).append($diasSemana).append($divLimpio).append($diasMes).append($divLimpio).append($cerrar).find('#calendario-mes').width(anchoDM);
				$('#calendario-semana').width(settings.width);
				$.each(settings.diasW,function(){
					var iDiaEs = iDia >= largoDiasW ? 0 : iDia++;
					$('<div>').width(anchoDias).html(settings.diasW[iDiaEs]).appendTo('#calendario-semana');
				});
				$('#calendario-cal').generarCalC(fecha, $este).show().addClass('calendario-liga').click(function(){
					return false;
				});
				$('#calendario-cerrar').addClass('calendario-liga').click(function(){
					borrarCal();
					return false;
				});
			});
		});
		$.fn.generarCalC = function(fecha,inptD){
			this.each(function(){
				var $este= $(this);
				var $superEste= $(this).parent();
				var anchoDias = settings.width/7;
				var laFecha = fecha == null || fecha =="" || fecha =="0000-00-00" ?  new Date() : stringToDate(fecha);
				var laFechPrevM = new Date(laFecha);
				laFechPrevM.setMonth(laFecha.getMonth()-1);
				var laFechSigueM = new Date(laFecha);
				laFechSigueM.setMonth(laFecha.getMonth()+1);
				//var tituloMesAnio = settings.mesesM[laFecha.getMonth()] + ' ' + laFecha.getFullYear();
				var tituloMesAnio = '<span class="cal-texto-mes" id="' + laFecha.getMonth() + '">' + settings.mesesM[laFecha.getMonth()] + '</span> <span class="cal-texto-anio" id="' + laFecha.getFullYear() + '">' + laFecha.getFullYear() + '</span>';
				var laFechaDia1 = new Date(laFecha);
				laFechaDia1.setDate(1);
				laFechaDia1.setDate(1-(7 + laFechaDia1.getDay()-settings.inicial)%7);
				var diaHoy = new Date(laFechaDia1);
				$este.find('#calendario-dias-mes').html('');
				while (diaHoy.getMonth() == laFecha.getMonth() || diaHoy.getMonth() == laFechaDia1.getMonth()) {
					for (var semana_hoy_dia=0; semana_hoy_dia<7; semana_hoy_dia++) {
						if (diaHoy.getDate() == laFecha.getDate() && diaHoy.getMonth() == laFecha.getMonth()){
							if (diaHoy.getMonth() == laFecha.getMonth()){
								var unDiv= $('<div class="calendario-dia-hoy" id="' + dateToString(diaHoy) + '">' + diaHoy.getDate()+'</div>');
							}
						} else {
							if (diaHoy.getMonth() == laFecha.getMonth()){
								var unDiv= $('<div class="calendario-dia-x" id="' + dateToString(diaHoy) + '">' + diaHoy.getDate() + '</div>');
							} else {
								var unDiv= $('<div>&nbsp;</div>');
							}
						}
						$este.find('#calendario-dias-mes').append(unDiv);
						diaHoy.setDate(diaHoy.getDate()+1);
					}
				}
				$este.find('#calendario-mes').html('').append(tituloMesAnio).end().find('#calendario-dias-mes').find('div').each(function(){
					$(this).width(anchoDias);
				});
				$este.find('#calendario-dias-mes').find('div.calendario-dia-x').each(function(){
					$(this).addClass('calendario-liga').click(function(){
						var superSuper = $(this).parent().parent().parent();
						var nuevaFecha= $(this).attr('id');
						inptD.val(nuevaFecha);
						borrarCal();
						if (settings.onSelucted !== undefined) {
						   settings.onSelucted(nuevaFecha);
						}
						return false;
					});
				});
				$este.find('#calendario-dias-mes').find('div.calendario-dia-hoy').each(function(){
					$(this).addClass('calendario-liga').click(function(){
						var superSuper = $(this).parent().parent().parent();
						var nuevaFecha= $(this).attr('id');
						inptD.val(nuevaFecha);
						borrarCal();
						if (settings.onSelucted !== undefined) {
							//echo('Selucted');
						   settings.onSelucted(nuevaFecha);
						}
						return false;
					});
				});
				$este.find('#calendario-prev').unbind('click').addClass('calendario-liga').click(function(){
					$este.generarCalC(dateToString(laFechPrevM),inptD);
					return false;
				});
				$este.find('#calendario-sigue').unbind('click').addClass('calendario-liga').click(function(){
					$este.generarCalC(dateToString(laFechSigueM),inptD);
					return false;
				});
				$este.find('#calendario-mes span.cal-texto-anio').click(function(){	
					var yoCtrl = $(this);
					var dat = yoCtrl.attr('id');
					var anioSelect = generaListaAnual(dat);
					yoCtrl.hide().after(anioSelect);
					anioSelect.focus().blur(function(){
						yoCtrl.show();
						anioSelect.remove();
					});
					anioSelect.change(function(){
						var elegido = $(this).val();
						var elOtroElegido = $este.find('#calendario-mes span.cal-texto-mes').attr('id');
						var laFechaSalta = new Date(laFecha);
						laFechaSalta.setFullYear(elegido);
						laFechaSalta.setMonth(elOtroElegido);
						$este.generarCalC(dateToString(laFechaSalta),inptD);
					});
				});				
				$este.find('#calendario-mes span.cal-texto-mes').click(function(){
					var yoCtrl = $(this);
					var dat = yoCtrl.attr('id');
					var mesSelect = generaListaMensual(dat);
					yoCtrl.hide().after(mesSelect);
					mesSelect.focus().blur(function(){
						yoCtrl.show();
						mesSelect.remove();
					});
					mesSelect.change(function(){
						var elegido = $(this).val();
						var elOtroElegido = $este.find('#calendario-mes span.cal-texto-anio').attr('id');
						var laFechaSalta = new Date(laFecha);
						laFechaSalta.setMonth(elegido);
						laFechaSalta.setFullYear(elOtroElegido);
						$este.generarCalC(dateToString(laFechaSalta),inptD);
					});
				});
			});
			return this;
		}
		var generaListaAnual = function(este){
			var sElect = $('<select>').attr('id','selAnio');
			var este = Number(este);
			var atras = este - settings.espacioAnios;
			var hoyFA = new Date();
			var adelante = hoyFA.getFullYear() /*+ settings.espacioAnios*/;
			for (var i= atras; i<=adelante; i++){
				var sel = i==este ? ' selected="selected"' : '';
				var opt = $('<option' + sel + '>').attr('value',i).text(i);
				sElect.append(opt);
			}
			return sElect;			
		}
		var generaListaMensual = function(este){
			var sElect = $('<select>').attr('id','selAnio');
			var este = Number(este);
			var atras = este - settings.espacioAnios;
			var adelante = este + settings.espacioAnios;
			var meses = settings.mesesM.length;
			for (var i= 0; i<meses; i++){
				var sel = i==este ? ' selected="selected"' : '';
				var opt = $('<option' + sel + '>').attr('value',i).text(settings.mesesM[i]);
				sElect.append(opt);
			}
			return sElect;			
		}		
		var borrarCal= function(){
			if($('#calendario-cal') != null){
				$('#calendario-cal').remove();
			}
		}
		var stringToDate = function(fch) {
			var re_date = /^(\d+)\-(\d+)\-(\d+)$/;
			if (!re_date.exec(fch))
				return new Date();
			 else
				return (new Date (RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6));
		}
		var dateToString = function(fech) {
			var aa= fech.getFullYear();
			var mm= fech.getMonth()+1;
			var dd= fech.getDate();
			if (mm<10){
				mm= "0" + mm;
			}
			if (dd<10){
				dd= "0" + dd;
			}
			var estafecha=  aa + "-" + mm + "-" + dd;
			return estafecha;
		}	
		var dateToStringDiv= function(fech){
			var fechas = fech.split('-');
			return Number(fechas[2]) + '/' + settings.subMesesM[Number(fechas[1])-1] + '/' + Number(fechas[0]);
		}				
		return this;
	};
})(jQuery);

