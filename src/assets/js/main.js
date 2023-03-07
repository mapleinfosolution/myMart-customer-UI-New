    /* open popup  */
    function open_popup(id){
        
        var modal = new bootstrap.Modal(document.getElementById(id));
        modal.show();
        return false;

    }

    function best_seller_slider (){
        
        if(document.querySelectorAll('.best_seller_sec .splide').length > 0) {
            new Splide( '.best_seller_sec .splide', {
                gap:'10px',
                type:"loop",
                perPage: 5,
                pagination:false,
                lazyLoad: 'nearby',
                grid :{
                    rows:2,
                    gap : {
                        row: '10px',
                        col: '10px',
                    }
                    
                },
                breakpoints: {
                    '1030': {
                        perPage: 4,
                    },
                    '992': {
                        perPage: 3,
                    },
                    '700': {
                        perPage: 2,
                        arrows:true
                    }
                }
            } ).mount(window.splide.Extensions);

            if($('.best_seller_sec .prod_thumbs_caro').length > 0){
    
                $('.best_seller_sec .prod_thumbs_caro').slick({
                    dots: true
                });
                
            }


        }
    }

    function recomanded_product_slider(){
        if(document.querySelectorAll('.recomanded_prods_sec .splide').length > 0) {
            if(document.querySelectorAll('.recomanded_prods_sec .splide').length > 10){
                new Splide( '.recomanded_prods_sec .splide', {
                    gap:'10px',
                    type:"true",
                    perPage: 5,
                    pagination:false,
                    lazyLoad: 'nearby',
                    grid :{
                        rows:2,
                        cols: 1,
                        gap : {
                            row: '10px',
                            col: '10px',
                        }
                        
                    },
                    breakpoints: {
                        '1030': {
                            perPage: 4,
                        },
                        '992': {
                            perPage: 3,
                        },
                        '700': {
                            perPage: 2,
                            //arrows:true
                        }
                    }
                } 
                
                
                ).mount(window.splide.Extensions);
            }else{
                new Splide( '.recomanded_prods_sec .splide', {
                    gap:'10px',
                    type:"true",
                    perPage: 5,
                    pagination:false,
                    lazyLoad: 'nearby',
                    grid :{
                        rows:1,
                        cols: 1,
                        gap : {
                            row: '10px',
                            col: '10px',
                        }
                        
                    },
                    breakpoints: {
                        '1030': {
                            perPage: 4,
                        },
                        '992': {
                            perPage: 3,
                        },
                        '700': {
                            perPage: 2,
                            //arrows:false
                        }
                    }
                } 
                
                
                ).mount(window.splide.Extensions);
            }
            
            
            if($('.recomanded_prods_sec .prod_thumbs_caro').length > 0){
    
                $('.recomanded_prods_sec .prod_thumbs_caro').slick({
                    dots: true,
                    autoplay: true,
                });
                
            }
            
        }
    }
    
    function hoverIndicator(elm, parent){
        var selector;
        var parent_obj;
        var selected_elem;
        
    
        var get_parent_pos = function(){
            return document.querySelector(parent).getBoundingClientRect();
        }
    
    
        var get_opts = function(elm){
            let parentPos = get_parent_pos();
            let childPos = elm.getBoundingClientRect();
            let relativePos = {};
            relativePos.top = childPos.top - parentPos.top,
            relativePos.right = childPos.right - parentPos.right,
            relativePos.bottom = childPos.bottom - parentPos.bottom,
            relativePos.left = childPos.left - parentPos.left,
            relativePos.width = childPos.width,
            relativePos.height = childPos.height;
            return relativePos;
        }
    
        var set_elm_opt = function(width, height, top, left){
            let indicator = document.querySelector(parent+' .indicator');
            indicator.style.width = width+"px";
            indicator.style.height = height+"px";
            indicator.style.top = top+"px";
            indicator.style.left = left+"px";
        }
    
        var mover = function(elm){
            let opt = get_opts(elm);
            
            set_elm_opt(opt.width, opt.height, opt.top, opt.left);
        }
    
        var hasClass = function(element, className) {
            return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
        }
    
    
    
        var init = function(){
            //init variable
            selector = document.querySelectorAll(elm);
            parent_obj = document.querySelectorAll(parent)[0];
            selected_elem = document.querySelector(elm+".selected");
            var selected_opt = get_opts(selected_elem);
            set_elm_opt(selected_opt.width, selected_opt.height, selected_opt.top, selected_opt.left);
            //var $that = this;
            //methods
            selector.forEach(function(element){
                /*
                //mouse over
                element.addEventListener("mouseover", function(event){
                    mover(element);
                    element.classList.add('hovered');
                    document.querySelector(elm+".selected").classList.remove('hovered');
                })
    
                //mouse out
                element.addEventListener("mouseout", function(event){
                    mover(document.querySelector(elm+".selected"));
                    element.classList.remove('hovered');
                    document.querySelector(elm+".selected").classList.add('hovered');
                })
                */
    
                //mouse down
                element.addEventListener("mousedown", function(event){
                    mover(element);
                    selector.forEach(function(item){
                        item.classList.remove('selected');
                        item.classList.remove('hovered');
                    })
                    event.target.classList.add('selected');
                    event.target.classList.add('hovered');

                })
            })
            
            
        }
        
        init();
    }



$(document).ready(function(){ 




    $('.search_inp_txt').on('input', function(){
        $(this).closest('.main-search').find('.search-bar-drops-lists').slideDown();
    })
    
    $('.search_inp_txt').blur(function(){
        $(this).closest('.main-search').find('.search-bar-drops-lists').slideUp();
    })
    /*$(".banner-carosual").slick({
        autoplay: true,
        dots: true,
    });
    */

    $('.cat_btn_m').click(function(){
        $('body').addClass('m-select-cat-on');
    })

    $('.select-cat-check-t .m-header-back').click(function(){
        $('body').removeClass('m-select-cat-on');
    })

    /* auto open popup  */
    if($('.auto_open_first').length > 0){

        for (var i = 0, len = document.querySelectorAll('.auto_open_first').length; i < len; i++) {
            var auto_modal = new bootstrap.Modal(document.querySelectorAll('.auto_open_first')[i]);
            auto_modal.show();
        } 
    }



    /*$(".product-box-lists").slick({
        infinite: true,
        variableWidth: true,
        responsive:[
            {breakpoint: 1170,
                settings: {
                    variableWidth: false,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {breakpoint: 992,
                settings: {
                    variableWidth: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    //centerMode: true,
                    arrows: false,
                }
            }
        ]
    });*/

    
/*
    $(".brand-carosual").slick({
        infinite: true,
        variableWidth: true,
        autoplay: true,
        responsive:[
            {breakpoint: 700,
                settings: {
                    infinite: true,
                    arrows: false,
                    variableWidth: true,
                    
                }
            }
        ]
        
    });
    $(".highlight-carosual").slick({
        infinite: false,
        autoplay: false,
        slidesToShow: 4,
        responsive:[
            {breakpoint: 1030,
                settings: {
                    slidesToShow: 3
                }
            },
            {breakpoint: 800,
                settings: {
                    slidesToShow: 2
                }
            },
            {breakpoint: 600,
                settings: {
                    variableWidth: true,
                    arrows: false,
                }
            }
        ]
    });
    */
// category click
    /*$(".category_lists > li > a").click(function(e){
        e.preventDefault();
        if($(this).parent().hasClass('on')){
            $(this).parent().removeClass('on');
        }else{
            $(".category_lists > li").removeClass('on');
            $(this).parent().addClass('on');
            
        }
    })
    */
/*
$('.category_lists .mega_menu_switch').hover(function(){
    $('.left-category').addClass('mega_menu_on');
    $(this).closest('.has_sub').addClass('on')
})
*/



    //popover
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})


/* back to top */
$(".site-footer .scroll_top").click(function (e) {
    e.preventDefault();
    $("html, body").animate({scrollTop: 0}, 500);
 });

 /* Product slider */
 /*if($("#product-range-slider").length > 0){
    $("#product-range-slider").ionRangeSlider();
 }*/

 /*
var product_range_slider = $("#product-range-slider").data("ionRangeSlider");
 $('.prod-form-val-u').on('input',function(){
     let val = $(this).val();
    product_range_slider.update({
        from: val
    })
 })

 $('.prod-to-val-u').on('input',function(){
    let val = $(this).val();
   product_range_slider.update({
       to: val
   })
})
*/

/*$('.filter-cross').click(function(){
    $('body').removeClass('mobile-filter-on')
})
*/
/* */
/*
if($('.prod_thumbs_caro').length > 0){
    
$('.prod_thumbs_caro').slick({
    dots: true
});

}
*/

/* Filter click */
$('#m_filter_btn').click(function(){
    $('body').addClass('mobile-filter-on');
})

  });


  document.addEventListener( 'DOMContentLoaded', function () {
    /*var trending_slider = new KeenSlider("#trending_slider", {
        slidesPerView: 5,
        mode: "free-snap",
        spacing: 10,
        loop: true,
        breakpoints:{
            '(max-width: 992px)':{
                slidesPerView: 4,
            },
            '(max-width: 768px)':{
                slidesPerView: 3,
            }
        }
      });
    */
    /*  document
      .getElementById("trending_slider_next")
      .addEventListener("click", function () {
        trending_slider.next()
      })

      document
      .getElementById("trending_slider_prev")
      .addEventListener("click", function () {
        trending_slider.prev()
      })
*/

/*
      if(document.querySelectorAll('.best_seller_sec .splide').length > 0) {
            new Splide( '.best_seller_sec .splide', {
                gap:'10px',
                type:"loop",
                perPage: 5,
                pagination:false,
                lazyLoad: 'nearby',
                grid :{
                    rows:2,
                    gap : {
                        row: '10px',
                        col: '10px',
                    }
                    
                },
                breakpoints: {
                    '1030': {
                        perPage: 4,
                    },
                    '992': {
                        perPage: 3,
                    },
                    '700': {
                        perPage: 2,
                        arrows:false
                    }
                }
            } ).mount(window.splide.Extensions);
        }

        if(document.querySelectorAll('.recomanded_prods_sec .splide').length > 0) {
            new Splide( '.recomanded_prods_sec .splide', {
                gap:'10px',
                type:"loop",
                perPage: 5,
                pagination:false,
                lazyLoad: 'nearby',
                grid :{
                    rows:2,
                    gap : {
                        row: '10px',
                        col: '10px',
                    }
                    
                },
                breakpoints: {
                    '1030': {
                        perPage: 4,
                    },
                    '992': {
                        perPage: 3,
                    },
                    '700': {
                        perPage: 2,
                        arrows:false
                    }
                }
            } ).mount(window.splide.Extensions);
        }
*/







} );


function swiper_slider(elm, obj){
    return new Swiper(elm, obj);
}