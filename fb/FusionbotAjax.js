var FBAjax=new FBAjaxObject();

function FBAjaxObject() {
  this.success = // Status
  this.busy =    // Mutex
  this.responseText = // Response Text
  this.callback = false; // User Supplied Callback
  this.remove=function(id) { setTimeout(function() { document.getElementsByTagName("body")[0].removeChild(document.getElementById(id)); }, 0); }
  this.append=function(src,id) { // Create <script> and append, this calls our servers
   var e = document.createElement('script');
   e.setAttribute('id',id);
   e.setAttribute('src',src);
   document.getElementsByTagName("body")[0].appendChild(e);
  }
  this.httpreq=function(url,callback) {
   if(this.busy) return;
   this.busy=true;
   this.success=false;
   this.callback=callback;
   this.append(url,'fbajaxrm');
  }
}

function fbajax_complete(responseText) {
  // Contents of script will be a call to this function
  if(FBAjax.callback) {
    FBAjax.responseText=responseText;
    FBAjax.success=true;
    FBAjax.callback();
  }
  FBAjax.remove('fbajaxrm');
  FBAjax.busy = false;
}

