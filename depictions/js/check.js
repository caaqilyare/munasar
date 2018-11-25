
   function setAnchorTargets() {
     // if on Cydia, set link targets to _blank
     if (navigator.userAgent.search(/Cydia/) != -1) {
       $("a").each(function() {
         $(this).attr("target","_blank");
       });
     }
   }

    var repoContents =  {
        "#repoFooterLinks" :
            {"type":"custom"
                ,"source":"repo>footerlinks>link"
                ,"render":function(element,source) {
                    $.each(source, function(index,data) {
                        var a = $("<a class='link-item list-group-item'>");
                        a.attr("href",$(data).find('url').text());
                        if ($(data).find('iconclass')) {
                            var i =  $("<span>")
                            i.attr("class",$(data).find('iconclass').text());
                            console.log(i);
                            $(a).append(i);
                        }
                        $(a).append($(data).find('name').text());
                        $(element).append(a);
                    }); //each
                } //render
            }
    }
    $( document ).ready(function() {
        $.ajax({type: "GET", dataType: "xml",url : ("../repo.xml"),cache: false,
            success : function(xml){
				      data_loader_engine(repoContents,xml);
              setAnchorTargets();
			      },
            error: function() {
              $("#contactInfo").hide();
              setAnchorTargets();
            }
        }); //ajax


    }); // ready
