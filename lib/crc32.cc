#include <stdint.h>
#include <iostream>

#define CRC32_POLYNOMIAL 0xEDB88320L

/* --------------------------------------------------------------------------

Calculate a CRC value to be used by CRC calculation functions.

-------------------------------------------------------------------------- */

unsigned long CRC32Value(int i) {

     int j;

     unsigned long ulCRC;

     ulCRC = i;

     for ( j = 8 ; j > 0; j-- ) {

          if ( ulCRC & 1 )

               ulCRC = ( ulCRC >> 1 ) ^ CRC32_POLYNOMIAL;

          else

               ulCRC >>= 1;

     }

     return ulCRC;

}



/* --------------------------------------------------------------------------

Calculates the CRC-32 of a block of data all at once

ulCount - Number of bytes in the data block

ucBuffer - Data block

-------------------------------------------------------------------------- */

unsigned long CalculateBlockCRC32( unsigned long ulCount, unsigned char *ucBuffer ) {

     unsigned long ulTemp1;

     unsigned long ulTemp2;

     unsigned long ulCRC = 0;

     while ( ulCount-- != 0 ) {

          ulTemp1 = ( ulCRC >> 8 ) & 0x00FFFFFFL;

          ulTemp2 = CRC32Value( ((int) ulCRC ^ *ucBuffer++ ) & 0xFF );

          ulCRC = ulTemp1 ^ ulTemp2;

     }

     return( ulCRC );

}

/**
* check crc16 sum by table look-up
* @param [unsigned char*] *pDataIn data to be checked
* @param [int] len data length
* @param [unsigned short* number] sum result
* @return void
**/
char *CRC32CheckSum(uint8_t *pDataIn, int len) {
    unsigned long crc32 = CalculateBlockCRC32(len, pDataIn);
    char *sum = new char[9];
    sprintf(sum, "%08x", crc32);
    return sum;
}
