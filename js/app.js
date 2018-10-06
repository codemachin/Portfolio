		AOS.init();
		// initialize animate on scroll

		bootstrapValidate(['#message'], 'required:Enter at least 1 character!|max:100:Enter 100 chars at most!');
		bootstrapValidate('#email', 'email:Enter a valid email address!');
		bootstrapValidate('#subject', 'required:Enter at least 1 character!|max:40:Enter 40 chars at most!');
		// form validate using bootstrap-validate

		let formSubmitFunction = (...id) => {
			$('#formSubmit').empty();
			let c = 0;
			for(let y in id){
				if(!$(id[y]).val()){
					toastr.error(`Please enter ${id[y].replace("#","")}`)
					c++
				}else if($(id[y]).hasClass('is-invalid')){
					toastr.error(`${id[y].replace("#","")} details incorrect`)
					c++
				}
			}
			return c>0?false:true		
		} //function to check if form is valid or not. Also displays alert


		$(document).ready(function(){

			$(window).scroll(function(){
			  if(($(this).scrollTop() > 0) & ($(this).scrollTop() <650))
			  {
			  $(".navbar").css({"opacity":"0"})
			    $(".navbar").css({"visibility":"hidden"})
			    document.getElementById("myBtn").style.display = "none";
			  }
			  else {
			    $('nav').toggleClass('scrolled', $(this).scrollTop() > 650);
			    $(".navbar").css({"opacity":"1"});
			      $(".navbar").css({"visibility":"visible"})
			      if($(this).scrollTop() > 650){
			      	document.getElementById("myBtn").style.display = "block";
			      }else{
			      	document.getElementById("myBtn").style.display = "none";
			      }
			  }
			  
			}); // function to make navbar transparent and opaque also displays scroll
				// to top when scroll down

			$('.nav-link').click(function(e){
				let id = $(this).attr('data-target');
				$('html, body').animate({
			        scrollTop: $(id).offset().top
			    }, 500);
			})// smooth scroll to div on click navigation links

			$('.item4').click(function(e){
				$('html, body').animate({
			        scrollTop: $('#item-2').offset().top
			    }, 500);
			})// animate down button

			$('#contact').submit(function(e){
				e.preventDefault();

				let submitVal = formSubmitFunction('#email','#subject','#message');
				if(submitVal==false){
					return
				}

				$('#emailSend').css({'background-color':'#6c757d'})

				let email = $.trim($('#email').val());
				let subject = $.trim($('#subje ct').val());
				let message = $.trim($('#message').val());

				let data = {
					email:email,
					subject:subject,
					message:message
				}

			    $.ajax({	
			    			type: "POST",
							url: 'http://13.59.23.63/contact',
							data: data,

			                success : function(response){
			                	$('#emailSend').css({'background-color':'#007bff'})
			                	if(response.success){
			                		
					                toastr.success(`Email successfully sent to VIVEK SHANKAR !!!`)
					                $('#email').val("");
					                $('#subject').val("");
					                $('#message').val("");   
			                	}else{
			                		toastr.error(`Email successfully sent to VIVEK SHANKAR !!!`)
			                	}
			                    
			                },
			                error : function(request,errorType,errorMessage){
			                	$('#emailSend').css({'background-color':'#007bff'})
			                	$("#danger-alert").fadeTo(2000, 500).slideUp(500, function(){
				               		$("#danger-alert").slideUp(500);
				                });
			                },

			                timeout:25000, // in ms

			                beforeSend : function(){


			                },

			                complete : function(){


			                }

			            }//end argument list 
			        );// end ajax call 
			}) // end form submit call back
			// ajax to my heroku app that sends email
			

		});

		function topFunction() {
		    $('html, body').animate({
			        scrollTop: 0
			}, 500);
		}// scroll to top animation

		document.addEventListener('aos:in', ({ detail }) => {
		  if (!$(detail).hasClass("prog") && !$(detail).hasClass("foot")) {
		  	$('.skillbar').each(function(){
				$(this).find('.skillbar-bar').animate({
					width:0
				},10);
			});
		  }// reset skill bar when scroll up or down
		  if ($(detail).hasClass("prog")) {
		  	$('.skillbar').each(function(){
				$(this).find('.skillbar-bar').animate({
					width:$(this).attr('data-percent')
				},1000);
			});
		  }// start skillbar animation on focus
		  
		})
		window.onload = function(){
			$('body').css({'overflow':'visible'})
			$('section,footer,header').css({opacity: 0, display: "block"}).animate({opacity: 1}, 350);
			$(".alert").hide();
			$('#loader').css({'display':'none'}).animate({opacity: 0}, 500);
			AOS.refresh();
			// page on load functions
		}