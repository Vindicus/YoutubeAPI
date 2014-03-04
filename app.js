$(document).ready(function(){
var Token;
var nextToken;
var prevToken;
var inputStored;
var RequestParams;
var VideoId;
var Page=1;
var inputStored;
$(".Wrapper").prepend("<p class='QuickMsg'>Watch the video below, its funny");
$('.QuickMsg').delay(10000).fadeOut('slow');

	$("#submit").click(function(e){
		$(".QuickMsg").remove();
		$("iframe#FunnyVid").remove();
		Page=1;
		Token='';
		$(".Logo").attr("src","loader.gif");
		$(".Columns").remove();
		e.preventDefault();
		if($("#input").val()=='' || $("#input").val()==" "){
			inputStored="Most Viewed Youtube";
		}else{
		inputStored=$("#input").val();	
		}
		console.log(inputStored);
		Access();
		$("#loader").css('display','block');

		
	});
	$(".Next").click(function(){
		Page++;
		$(".Columns").remove();
		Token=nextToken;
		console.log(RequestParams);
		Access();
		console.log("Token "+Token);
		$("#loader").css('display','block');
	});
	$(".Prev").click(function(){
		Page--;
		if(Page<=0){
			alert("You reached the beginning of the page");
			Page=1;
			
		}else{
		$(".Columns").remove();
		Token=prevToken;
		Access();
		$("#loader").css('display','block');
		}
	});
	$(".Wrapper").on('click','.QueryTitle a',function(e){
		e.preventDefault();
		VideoId=$(this).attr('href');
		$("iframe#ClickedVid").remove();
		$(".Video").slideDown('slow').append("<iframe id='ClickedVid' width='1420' height='315' src='http://www.youtube.com/embed/"+VideoId+"?autoplay=1' frameborder='0' allowfullscreen></iframe>");
		alert("You can hide this video by pressing 'Ctrl' on your keyboard");
	});
	$("body").keyup(function(e){
		if(e.keyCode==17){
			$(".Video").fadeOut('slow');
		}
		
	});

function Clone(Title,Description,Img,Published,Channel,videoID,channelID){
	
	var $img="<img class='ColumnsImg' src='"+Img+"'/>";
	var $h2="<h2 class='QueryTitle'><a href='"+videoID+"'>"+Title+"</a></h2>";
	var $descr="<p class='Description'>"+Description+"</p>";
	var $publish="<p class='Published'>Uploaded on: "+Published.substring(0,10)+"</p>";
	var $Channel="<p class='Channel'>Channel Name: <a href='http://www.youtube.com/channel/"+channelID+"?autoplay=1' target='_blank'>"+Channel+"</a></p>";
	$(".Wrapper").append("<div class='Columns grid_4 clearfix'><div class='QueryBox'>"+$img+"</div><div class='QueryInfo'>"+$h2+$Channel+$publish+$descr+"</div></div>");
	$(".Navigation").fadeIn("slow");
	
	
}

function Access(){
	 RequestParams={	maxResults:20,
	 					pageToken:Token,
						order:"viewCount",
						q: inputStored,
						type: "video",
						videoType: "any",
						key:"AIzaSyCJz_BaT38FwqrY5IjQ4fwE5t-z7f6PLjw" }
						
	var AJAX=$.ajax({url:"https://www.googleapis.com/youtube/v3/search?part=snippet",
			data: RequestParams,
			dataType:"jsonp",
			type:"GET"
			}).done(function(data){
				$(".Logo").attr("src","youtube.png");
				$(".feedback").text("There are "+data.items.length+" queries for "+"'"+inputStored+"'"+" on this page");
				
				nextToken=data.nextPageToken;
				prevToken=data.prevPageToken;
				$.each(data.items,function(index, value){
				Clone(value.snippet.title,value.snippet.description,value.snippet.thumbnails.medium.url,value.snippet.publishedAt,value.snippet.channelTitle,value.id.videoId,value.snippet.channelId);

				});
				
			console.log("Token "+Token);
				console.log(data);
			}).fail(function(jqXHR, error, errorThrown){
		$('.feedback').append(error);
	});
		
}	

});
