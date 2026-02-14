# 📦 Salesforce Large File Uploader

### Chunk-Based File Upload Using LWC + Apex

## 🚀 Overview

**Salesforce Large File Uploader** is a Lightning Web Component that enables uploading large files (25MB+) to Salesforce using a chunk-based upload mechanism.

This solution overcomes common Salesforce limitations such as:

* Apex heap size limits (~6MB)
* Request payload limits
* Base64 size restrictions
* Large file handling constraints

Instead of sending the entire file in one request, the file is split into smaller chunks and uploaded sequentially to Apex, where it is reconstructed and saved as a `ContentVersion`.

---

## 🧠 How It Works

1. User selects a file.
2. File is converted to Base64 in the browser.
3. File is split into chunks (~750KB each).
4. Each chunk is sent sequentially to Apex.
5. Apex reconstructs the file.
6. File is saved as a Salesforce ContentVersion.
7. Upload counter updates on successful completion.

---

## 🛠 Tech Stack

* Lightning Web Components (LWC)
* Apex
* ContentVersion API
* Base64 Encoding
* Chunk Streaming Architecture

---

## 📂 Component Structure

### LWC

* `chunkFileUploader.html`
* `chunkFileUploader.js`

### Apex

* `uploadChunkToApex.cls`

---

## ⚙️ Features

✅ Supports 25MB+ uploads
✅ Chunk-based architecture
✅ Multiple file upload support
✅ Upload success counter
✅ Professional SLDS UI
✅ Safe duplicate null prevention
✅ Optional type-based logic support

---

## 🧩 Configuration

### Supported File Types

```
.pdf
.png
.jpg
.jpeg
.xlsx
```

Modify in HTML if needed:

```html
accept=".pdf,.png,.jpg,.jpeg,.xlsx"
```

---

## 📊 Upload Flow Logic

### Chunk Size

```javascript
const CHUNK_SIZE = 750 * 1024; // 750KB
```

This size ensures:

* Stable Apex processing
* No heap overflow
* Efficient sequential upload

---

## 🔒 When to Use This

Use this solution when:

* Uploading before record creation
* Implementing custom validation logic
* Handling controlled multi-step flows
* Integrating with external systems
* Need full control over upload process

---

## 🆚 Alternative Option

For simple record-based uploads, Salesforce provides:

```html
<lightning-file-upload>
```

This component automatically handles chunking internally and supports files up to 2GB.

Use chunk upload only when custom control is required.

---

## 📈 Enhancements (Future Scope)

* Upload progress bar
* Spinner during upload
* Retry mechanism for failed chunks
* Toast notifications
* Drag-and-drop support
* File size validation
* Metadata-driven upload configuration

---

## 🧪 Limitations

* Large binary concatenation in Apex requires careful handling
* Monitor heap usage in high-volume uploads
* Ensure proper ContentVersion linking if associating to records

---

## 📌 Example Usage

```html
<c-chunk-file-uploader></c-chunk-file-uploader>
```

---

## 👨‍💻 Developed By

**Gaurav Lokhande**
Salesforce Developer

---

## 🏷 Tags

Salesforce · LWC · Apex · File Upload · Chunk Upload · Enterprise Architecture · CRM Development
