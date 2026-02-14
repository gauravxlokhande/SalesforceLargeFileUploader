public class uploadChunkToApex {

@AuraEnabled
public static void uploadChunkFileToApex( String fileName, String base64Chunk, Boolean isFirstChunk, Boolean isLastChunk) {

    if (isFirstChunk) {
        ContentVersion cv = new ContentVersion();
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        cv.VersionData = EncodingUtil.base64Decode(base64Chunk);
        insert cv;
    } else {

        ContentVersion existing = [
            SELECT Id, VersionData
            FROM ContentVersion
            WHERE Title = :fileName
            ORDER BY CreatedDate DESC
            LIMIT 1
        ];

        Blob existingData = existing.VersionData;
        Blob newChunk = EncodingUtil.base64Decode(base64Chunk);

        Blob combined = Blob.valueOf(
            existingData.toString() + newChunk.toString()
        );

        existing.VersionData = combined;
        update existing;
    }
}

}
