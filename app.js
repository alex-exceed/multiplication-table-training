$(document).ready(function(){


//----------------------View--------------------------------

	var view = {

		showTask: function (a){
			
			for(i=0; i<15; i++){
			$('#tasks').append('<li>\
									<div class="input-group">\
  										<div class="input-group-prepend">\
    										<span class="input-group-text" id="">'+a[i]+'</span>\
  										</div>\
  											<input type="text" class="form-control" id="answer">\
										</div>\
								</li>' );
			};
		},

		showBtn: function () {
			$('#checkit').show();
		},

		resultAlert: function() {
			let n = $('.wrong').length;
			$('#result').append('<div class="alert alert-success" role="alert">\
  									You have '+n+' mistakes\
								</div>')
		}

		
	

	};







//----------------------end view----------------------------
//----------------------Model-------------------------------

	var model ={
		
		number: 0,
		arr2: [],
		

		newArr: function(){
			let arr = [2,3,4,5,6,7,8,9,];
			
			let arr2 = this.arr2;
			for (let j=0;j<8;j++){
				for (let i=0; i<7; i++){
					n = arr[j] +' x '+arr[i+1]+' =';
					arr2.push(n);
				}
			}

			function compareRandom(a, b) {
  				return Math.random() - 0.5;
			}
			arr2.sort(compareRandom);

			

				
		},

		check: function(){
			let obj = $('.input-group-prepend');
			obj.each(function() {
				
			let tonum = $(this).children().text();
			let a = +tonum.charAt(0);//console.log(a);
			let b  = +tonum.charAt(4);//console.log(b);
			let c = +$(this).siblings().val();//console.log(c);
				if (a*b === c){
					$(this).siblings().addClass('right');//console.log('++');
				} else 
				$(this).siblings().addClass('wrong');//console.log('--');
			});

			//console.log(a,b);

		}



		

		

	};
//----------------------end model---------------------------
//----------------------Controller--------------------------

	const controller = {

		startLesson: function(){
			model.newArr();
			view.showTask(model.arr2);
			view.showBtn();
		},
		
		checkAns: function() {
			model.check();
			view.resultAlert();
		}

	};
//----------------------end controller----------------------
//---------------anonimus initialize function---------------
	//(function(){
		//$('#task').on('click', '#answer', controller.answ);
		$('#start').click(controller.startLesson);
		$('#checkit').click(controller.checkAns);
		
	//}());




});