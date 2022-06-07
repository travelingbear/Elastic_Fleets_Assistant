//creates tabs and allows using DIVs to contain the content of each tab
function openTab(evt, tabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
	//firefox
	document.getElementById('titulo').scrollIntoView({ block: 'end',  behavior: 'smooth' });
}

//controls which OS will be shown in the wizard
function selectOS() {
	if (document.getElementById("select_windows").selected) {
		document.getElementById("if_windows").style.display = "block";
		document.getElementById("if_linux").style.display = "none";
	} else {
		document.getElementById("if_windows").style.display = "none";
		document.getElementById("if_linux").style.display = "block";
	}
  }


//makes the TAB #1, Prerequisites, the default opened when opening the page
document.getElementById("defaultOpen").click();

//populates S3 bucket policy and formats it as JSON to allow copy/paste using the console
function populateS3Policy() {
	let s3bucket = document.getElementById("BucketName").value;
	let s3policy = {"Version":"2012-10-17","Statement":[{"Sid":"AllowAppStream2.0ToRetrieveObjects","Effect":"Allow","Principal":{"Service":["appstream.amazonaws.com"]},"Action":["s3:GetObject"],"Resource":["arn:aws:s3:::" + s3bucket + "/*"]}]}
	document.getElementById('s3policy_block').innerHTML = JSON.stringify(s3policy, null, 4);
	document.getElementById('s3policyblock').style.display = 'block';
	document.getElementById("imageFolder").innerHTML = "'"+s3bucket+"'";
	document.getElementById("iconFolder").innerHTML = "'"+s3bucket+"'";
}

//Copies innerHTML of a tag to the clipboard, the way it is displayed - not invented, just copied from some thread in stack overflow, seriously
function copyToClipboard(var1){
	let val = document.getElementById(var1).innerHTML;
	const selBox = document.createElement('textarea');
	selBox.style.position = 'fixed';
	selBox.style.left = '0';
	selBox.style.top = '0';
	selBox.style.opacity = '0';
	selBox.value = val;
	document.body.appendChild(selBox);
	selBox.focus();
	selBox.select();
	document.execCommand('copy');
	document.body.removeChild(selBox);
	alert('text copied to clipboard, please use Ctrl-V to paste the data');
  }

//used to serialize JSON output and unhide the hidden PRE tag blocks to show the code to the user
function printResult(varResult,varBlock,varHidden) {
	let resultado = $(varResult).serializeJSON();
	document.getElementById(varBlock).innerHTML = JSON.stringify(resultado, null, '\t');
	document.getElementById(varHidden).style.display = 'block';
}

//populates paramater used in POWERSHELL ONLY, currently
function populateParam() {
	let AppBlkName = document.getElementById("Name").value;
	let SourceS3LocationKey = document.getElementById("SourceS3LocationKey").value;
	let FolderPath = SourceS3LocationKey.replace( "/","\\");
	document.getElementById("SetupScriptDetailsExeParam").value = '-File C:\\AppStream\\AppBlocks\\' + AppBlkName + '\\' + "MountScript.ps1"
}

//Slightly modified version of copyToClipboard() that copies CMD line to the clipboard
function copyCmdToClipboard(var1){
	let val = document.getElementById(var1).textContent;
	const selBox = document.createElement('textarea');
	selBox.style.position = 'fixed';
	selBox.style.left = '0';
	selBox.style.top = '0';
	selBox.style.opacity = '0';
	selBox.value = val;
	document.body.appendChild(selBox);
	selBox.focus();
	selBox.select();
	document.execCommand('copy');
	document.body.removeChild(selBox);
	alert('text copied to clipboard, please use Ctrl-V to paste the data');
  }

//downloads the innerHTML content of a var the way it is displayed (good for JSON - not YAML)
function download(filename, jsonVar) {
	let text = document.getElementById(jsonVar).innerHTML;
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);

	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	}
	else {
		pom.click();
	}
}

//download CMD function - sligtly modified to allow copying CMD text conent
function downloadCmd(filename, cmdVar) {
	let text = document.getElementById(cmdVar).textContent;
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);

	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	}
	else {
		pom.click();
	}
}

//populates launch path field adding C:\EFApps before the AppLaunchPath
function populateLaunchPath() {
	let AppLaunchPath = (document.getElementById('AppPath').value).replace(/[a-zA-Z]:\\/, ''); //it cleans any "<DRIVE_LETTER>:\" before adding to the variable
	document.getElementById("LaunchPath").value = 'C:\\EFApps\\' + AppLaunchPath;
	changeBorderColorNeutralWindowsPath('LaunchPath');
}

//populates command to mount the folder as C:\EFApps. Also will copy the AppBlock name to the AppBlock name field in TAB #2
function populateCommand() {
	let AppBlkName = document.getElementById('AppBlockName').value;
	let VHDXFile = document.getElementById('VHDXName').value;
	document.getElementById("cmdAppBlock").innerHTML = AppBlkName;
	document.getElementById("cmdVHDX").innerHTML = VHDXFile;
	document.getElementById("Name").value = AppBlkName;
}

//will populate all bucket fields
function populateBucketField(fieldName) {
	let BucketField = document.getElementById("BucketName").value;
	let BucketFolder = BucketField.split("/");
	document.getElementById(fieldName).value = BucketFolder[0];
}

//will be called everytime focus leave the field - good to clean the red border
function changeBorderColorNeutral(fieldID) {
	if (document.getElementById(fieldID).value !== "") {
		document.getElementById(fieldID).style.border = "";
		document.getElementById(fieldID).value = document.getElementById(fieldID).value.replace(/\s+/g,'');
		//document.getElementById(fieldID).value = document.getElementById(fieldID).value.replace(/\\+/g,'');
		document.getElementById(fieldID).value = document.getElementById(fieldID).value.replace(/\\+/g,'/');
	}
}
function changeBorderColorNeutralWindowsPath(fieldID) {
	if (document.getElementById(fieldID).value !== "") {
		document.getElementById(fieldID).style.border = "";
		document.getElementById(fieldID).value = document.getElementById(fieldID).value.replace(/\s+/g,'');
		document.getElementById(fieldID).value = document.getElementById(fieldID).value.replace(/\/+/g,'\\');
	}
}

//will be called at the end and applied to each blank field
function changeBorderColorRed(fieldID) {
	if (document.getElementById(fieldID).value == "") {
		document.getElementById(fieldID).style.border = "2px solid red";
	}
}

//will be called at the end and applied to each blank field
function changeIconFieldBorderColorRed() {
	if (document.getElementById('AppSourceS3LocationKey').value == "") {
		document.getElementById('AppSourceS3LocationKey').style.border = "2px solid red";
		document.getElementById('AppSourceS3LocationKey').focus();
	}
}

//will be called at mouse on leave for the BucketName input
function checkBucketNameFormat() {
	document.getElementById('BucketName').value = document.getElementById('BucketName').value.replace(/\\+/g,'/');
	document.getElementById('BucketName').value = document.getElementById('BucketName').value.replace(/\/$/, '');
	document.getElementById('BucketName').value = document.getElementById('BucketName').value.replace(/\s+/g,'');
	if ((document.getElementById('BucketName').value.indexOf("/"))>0){
		document.getElementById('folderAlert').style.display = 'none';
		document.getElementById('BucketName').style.border = "";
	} else {
		changeBorderColorRed('BucketName');
		document.getElementById('folderAlert').style.display = 'block';
	}
}

//populates the VHD name TAB #2
function populateVhdField(fieldName) {
	let BucketField = document.getElementById("BucketName").value;
	let VHDXFile = document.getElementById('VHDXName').value;
	let BucketApp = BucketField.split("/");
	if (BucketApp[1]) {
		document.getElementById(fieldName).value = BucketApp[1] + "/" + VHDXFile;
	} else {
		document.getElementById(fieldName).value = VHDXFile;
	}
}

//populates the script location field in the TAB #2
function populateScriptField(fieldName) {
	let BucketField = document.getElementById("BucketName").value;
	let BucketApp = BucketField.split("/");
	if (BucketApp[1]) {
		document.getElementById(fieldName).value = BucketApp[1] + "/MountScript.ps1"
	} else {
		document.getElementById(fieldName).value = "MountScript.ps1"
	}
	
}

//adds a green check mark to the tabs
function checkMark(checkTab) {
	document.getElementById(checkTab).style.display = 'contents';
}

//validate and IF all inputs are correct, if yes, allows downloading CF template, otherwise will change the border color of each field as red and won't allow download the CF template
function populateCfTemplate() {
	var noGo = 0; //this var will be used to validate. It should be 0 to allow downloading. If any of the conditions below are not true, it will add a + 1 to noGo. It cleans after each time you press the download CF button.
	
	//appblock
	if (document.getElementById("Name").value != '') {
		var AppBlkName = (document.getElementById("Name").value).replace(/[^a-zA-Z0-9]/g, '');
		var AppExecutableParams = '-File C:\\AppStream\\AppBlocks\\' + AppBlkName + '\\' + "MountScript.ps1";
	}else {
		changeBorderColorRed('Name');
		var noGo = noGo+1;
	}
	///
	if ((document.getElementById('BucketName').value.indexOf("/"))>0){
		var s3bucket = document.getElementById('SourceS3LocationBucket').value;
		document.getElementById('folderAlert').style.display = 'none';
	} else {
		changeBorderColorRed('BucketName');
		document.getElementById('folderAlert').style.display = 'block';
		var noGo = noGo+1;
	}
	///
	if (document.getElementById("SourceS3LocationKey").value != '') {
		var SourceS3LocationKey = document.getElementById("SourceS3LocationKey").value;
	}else {
		changeBorderColorRed('SourceS3LocationKey');
		var noGo = noGo+1;
	}
	///
	if (document.getElementById("SetupScriptDetailsKey").value != '') {
		var ScriptLocation = document.getElementById('SetupScriptDetailsKey').value;
	}else {
		changeBorderColorRed('SetupScriptDetailsKey');
		var noGo = noGo+1;
	}
	
	//application
	if (document.getElementById("AppName").value != '') {
		var AppName = document.getElementById("AppName").value; //app name
	}else {
		changeBorderColorRed('AppName');
		var noGo = noGo+1;
	}
	///
	if (document.getElementById("AppSourceS3LocationKey").value != '') {
		var AppIconNameParam = document.getElementById("AppSourceS3LocationKey").value; //icon name + folder
	}else {
		changeBorderColorRed('AppSourceS3LocationKey');
		var noGo = noGo+1;
	}
	///
	if (document.getElementById("InstanceFamilies").value != '') {
		var AppInstanceFamilyParam = document.getElementById("InstanceFamilies").value;
	}else {
		changeBorderColorRed('InstanceFamilies');
		var noGo = noGo+1;
	}
	///
	if (document.getElementById("Platforms").value != '') {
		var AppPlatformsParam = document.getElementById("Platforms").value;
	}else {
		changeBorderColorRed('Platforms');
		var noGo = noGo+1;
	}
	///
	if (document.getElementById("LaunchPath").value != '') {
		let CleanedAppLaunchPath = (document.getElementById('AppPath').value).replace(/[a-zA-Z]:\\/, ''); //it cleans any "<DRIVE_LETTER>:\" before adding to the variable
		var AppLaunchPath = "C:\\EFApps\\" + CleanedAppLaunchPath
	}else {
		changeBorderColorRed('AppPath');
		var noGo = noGo+1;
	}
	///
	if (document.getElementById("timeoutSec").value != '') {
		var timeoutSeconds = document.getElementById("timeoutSec").value
	}else {
		changeBorderColorRed('timeoutSec');
		var noGo = noGo+1;
	}
	///
	if (document.getElementById("LaunchPath").value != '') {
	}else {
		changeBorderColorRed('LaunchPath');
		var noGo = noGo+1;
	}
	
	if (noGo == 0){
		//create template
		var CFTemplate = {"Parameters":{"AppBlockNameParam":{"Description":"Name of the app","Type":"String","Default":""+AppBlkName+""},"AppBlockS3Bucket":{"Description":"S3 Bucket where you put your VHD","Type":"String","Default":""+s3bucket+""},"AppBlockS3VhdLocation":{"Description":"Location of your VHD: folder/file.vhdx","Type":"String","Default":""+SourceS3LocationKey+""},"AppBlockS3ScriptLocation":{"Description":"Location of your script: folder/script.ps1","Type":"String","Default":""+ScriptLocation+""},"AppBlockExecutablePath":{"Description":"Path of the shell","Type":"String","Default":"C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\powershell.exe"},"AppBlockExeParameters":{"Description":"Parameters used for your script to run","Type":"String","Default":""+AppExecutableParams+""},"AppBlockScriptTimeout":{"Description":"Timeout of the script in seconds","Type":"Number","Default":""+timeoutSeconds+""},"AppNameParam":{"Description":"Name of the app","Type":"String","Default":""+AppName+""},"AppIconNameParam":{"Description":"Name of the icon","Type":"String","Default":""+AppIconNameParam+""},"AppInstanceFamilyParam":{"Description":"Instance Family","Type":"String","Default":""+AppInstanceFamilyParam+""},"AppLaunchPathParam":{"Description":"Path of the application when launching from the OS","Type":"String","Default":""+AppLaunchPath+""},"AppPlatformsParam":{"Description":"Platforms to run the app","Type":"String","Default":""+AppPlatformsParam+""}},"Resources":{"CFAppBlock1":{"Type":"AWS::AppStream::AppBlock","Properties":{"Description": "Created with wizard page tabajara","DisplayName":""+AppBlkName+"","Name":""+AppBlkName+"","SetupScriptDetails":{"ExecutableParameters":{"Ref":"AppBlockExeParameters"},"ExecutablePath":{"Ref":"AppBlockExecutablePath"},"ScriptS3Location":{"S3Bucket":{"Ref":"AppBlockS3Bucket"},"S3Key":{"Ref":"AppBlockS3ScriptLocation"}},"TimeoutInSeconds":{"Ref":"AppBlockScriptTimeout"}},"SourceS3Location":{"S3Bucket":{"Ref":"AppBlockS3Bucket"},"S3Key":{"Ref":"AppBlockS3VhdLocation"}}}},"CFApplication1":{"Type":"AWS::AppStream::Application","Properties":{"Description":"Created with wizard page tabajara","AppBlockArn":{"Ref":"CFAppBlock1"},"IconS3Location":{"S3Bucket":{"Ref":"AppBlockS3Bucket"},"S3Key":{"Ref":"AppIconNameParam"}},"InstanceFamilies":[{"Ref":"AppInstanceFamilyParam"}],"LaunchPath":{"Ref":"AppLaunchPathParam"},"Name":{"Ref":"AppNameParam"},"Platforms":[{"Ref":"AppPlatformsParam"}]},"DependsOn":"CFAppBlock1"}}}
		document.getElementById('CFTemplate_block').innerHTML = JSON.stringify(CFTemplate, null, 4);
		<!-- document.getElementById('CFTemplateblock').style.display = 'block'; -->
		download('AppBlk_App_CFTemplate.json', 'CFTemplate_block');
	} else {
			alert('There are fields that need to be fixed.');
	}
}

///// CLI FUNCTIONS //////

//populates ARN to be used in the required Application JSON 
function populateARN() {
	let AppBlkName = document.getElementById("Name").value;
	let appregion = document.getElementById("region").value;
	let appaccount = (document.getElementById("account").value);
}
//download Application JSON - prepares and calls the download() function to download Application JSON input to use in the CLI
function downloadAppJson(varResult,varBlock) {
	let AppBlkName = document.getElementById("Name").value;
	let appregion = document.getElementById("region").value;
	let appaccount = (document.getElementById("account").value);
	let varArn = "arn:aws:appstream:" + region.value + ":" + appaccount + ":app-block/" + AppBlkName;
	let resultado = $(varResult).serializeJSON();
	document.getElementById(varBlock).innerHTML = JSON.stringify(resultado, null, '\t');
	download('ApplicationConfig.json', 'ApplicationJSONResults');
}
//creates the CLI policy to run the commands from the CLI
function populateCliPolicy() {
	let region = document.getElementById("region").value;
	let account = document.getElementById("account").value;
	if(typeof(region) != 'undefined' && region != null){
		let region = document.getElementById("region").value;
	} else{
		let region = "REGION";
	}
	if(typeof(account) != 'undefined' && account != null){
		let account = document.getElementById("account").value;
	} else{
		let account = "YOUR_ACCOUNT";
	}		
	let clipolicy = {"Version":"2012-10-17","Statement":[{"Sid":"AppBlock-Application0","Effect":"Allow","Action":["appstream:CreateAppBlock","appstream:CreateApplication"],"Resource":["arn:aws:appstream:"+ region + ":"+ account +":app-block/*","arn:aws:appstream:"+region+":"+account+":application/*"]}]};
	document.getElementById('clipolicy_block').innerHTML = JSON.stringify(clipolicy, null, 4);
	document.getElementById('clipolicyblock').style.display = 'block';
}
//populates region in the CLI command
function populateRegion() {
	let RegionName = document.getElementById('region').value;
	document.getElementById("cmdAPBRegion").innerHTML = RegionName;
	document.getElementById("cmdAPPRegion").innerHTML = RegionName;
}
//downloads the AppBlock JSON to use as input to the CLI
function downloadAppBlkJson(varResult,varBlock) {
	let resultado = $(varResult).serializeJSON();
	document.getElementById(varBlock).innerHTML = JSON.stringify(resultado, null, '\t');
	download('AppBlockConfig.json', 'AppBlockJSONResults');
}
