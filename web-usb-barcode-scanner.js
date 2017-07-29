/* Do what the hell you want with it license. Read through this and check before using, this has been made for my own specific use and may not perform as necessary. */

var barcodeBuffer = "";
var barcodeStartsequenceLock = false;
var barcodeDataLock = false;
var barcodePrefixChar = "F8"
var onBarcodeScanCallback = null;

function onKeyDown(e){
    
    // If potential part of barcode start sequence
    if( e.key == barcodePrefixChar ){

        if( barcodeDataLock ){

            // Found barcode, reset
            if ( onBarcodeScanCallback != null ){
                // onBarcodeScan has not been overwritten
                onBarcodeScanCallback(barcodeBuffer);
            }
            barcodeBuffer = "";
            barcodeDataLock = false;

        } else {

            // Start of barcode
            barcodeDataLock = true;

        }

        // Never allow this key to be pressed
        return false;

    } else if( barcodeDataLock ) {

        // Make sure that only supported key presses are counted (for example, don't allow the shift key)
        // Uses little function to clean up if statement

        function checkInput(keycode){
            if( keycode == 9)
                return true;
            if( 48 <= keycode && keycode <= 57)
                return true;
            if( 64 <= keycode && keycode <= 90 )
                return true;
            if( 96 <= keycode && keycode <= 107 )
                return true;
            if( 109 <= keycode && keycode <= 111 )
                return true;
            if( 186 <= keycode && keycode <= 192 )
                return true;
            if( 219 <= keycode && keycode <= 222 )
                return true;
            return false;
        }

        // Make sure to only enter readable characters - otherwise the shift key, etc, would be registered
        if( checkInput( e.keyCode ) ){
            barcodeBuffer += e.key;
        }
        
        // Don't allow key, it is part of barcode
        return false;

    }
    
    // Must be legit character
    return true;

}

document.onkeydown = onKeyDown;