$(document).ready(function(){


//----------------------View--------------------------------

	var view = {

		showTask: function (a){
			
			for(i=0; i<15; i++){
			$('#tasks').append('<li>\
									<div class="input-group wid">\
  										<div class="input-group-prepend numbers">\
    										<span class="input-group-text" id="">'+a[i]+'</span>\
  										</div>\
  											<input type="text"  id="answer"><button type="button" class="btn btn-secondary" id="next">next >>></button>\
								</li>' );

			};

            $('#tasks li').hide();
            $('#tasks li:first').show();
            $('#answer').focus();

		},

		showBtn: function () {
			$('#checkit').show();
		},

		/*resultAlert: function(n) {

			$('#result').append('<div class="alert alert-success" role="alert">\
  									You have '+n+' mistakes\
								</div>')
		},*/

		startBtnHide: function () {
			$('#start').hide();
		},

		showNext: function (b) {
            console.log('showNextfunc');
            function func(){
            	$('#tasks li').eq(model.index+1).show();
                $('#tasks li:visible').find('input').focus();
            }
			setTimeout(func,1001);
            //$('#next').click(controller.nextItem);
			model.index = b; console.log(b);
		},

		showResult: function(n) {

        $('#result').append('<div class="alert alert-success" role="alert">\
  									You have '+n+' mistakes\
								</div>\
								<button type="button" class="btn btn-success btn-lg" id="tryAgain">Try again</button>')
            $('body').on('click', '#tryAgain', controller.startLesson);
		}
	};

//----------------------end view----------------------------
//----------------------Model-------------------------------

	var model ={
		
		number: 0,
		arr2: [],
        index: 0,
		numOfmis: 0,

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

		check: function() {

            let tonum = $('#tasks li:visible').find('span').text();
            let a = +tonum.charAt(0);//console.log(a);
            let b = +tonum.charAt(4);//console.log(b);
            let c = +$('#tasks li:visible').find('input').val();//console.log(c);
            if (a * b === c) {
                $('#tasks li:visible').addClass('right');//onsole.log('++');
                $('#tasks li:visible').find('input').addClass('green');
            } else {
                $('#tasks li:visible').addClass('wrong');//console.log('--');
                $('#tasks li:visible').find('input').addClass('red');
            }
		},

		whatIsNext: function() {
			let index = $('#tasks li:visible').index();
			index = this.index;
			//console.log(index);
            setTimeout("$('#tasks li:visible').hide();",1000);
		},

		result: function () {
            if (model.index === 14) {
                console.log('if1');

                let numOfmiss = $('.wrong').length;
                this.numOfmis = numOfmiss;
                console.log(numOfmiss + "numofmis");
                view.showResult(model.numOfmis);
            }
		}

		/*saveAnswer: function() {
			let answer = $('#tasks li:visible').find('input').val();
			//answer = this.answer;
			console.log(answer);
			//console.log($('#tasks li:visible').index());
		}*/
	};
//----------------------end model---------------------------
//----------------------Controller--------------------------

	const controller = {

		startLesson: function(){
			$('li').remove();
            $('.alert-success').remove();
            $('#tryAgain').remove();
			model.newArr();
			view.showTask(model.arr2);
			view.showBtn();
			view.startBtnHide();
            //$('#next').click(controller.nextItem);
            $('li').on('click', '#next', controller.nextItem);
		},
		
		checkAns: function() {
			model.check();
			view.resultAlert();
		},

		nextItem: function () {
            console.log('controller nextItem');
            model.check();
			model.whatIsNext();
            view.showNext(model.index+1);
			model.result();

		}


	};
//----------------------end controller----------------------
//---------------anonimus initialize function---------------
	//(function(){
		//$('li').on('click', '#next', controller.nextItem);
		$('#start').click(controller.startLesson);
		//$('#checkit').click(controller.checkAns);
    	//$('#next').click(function(){console.log('---')});//controller.nextItem);
		
	//}());
});