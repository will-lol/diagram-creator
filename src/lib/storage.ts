/**
 * OPFS (Origin Private File System) Storage Wrapper
 * Handles saving and retrieving binary data (files) associated with chat messages.
 */

export interface StoredFile {
  id: string; // The UUID used as filename in OPFS
  originalName: string;
  type: string;
  size: number;
}

export interface FileStorage {
  saveFile(file: File): Promise<StoredFile>;
  getFile(fileId: string): Promise<File>;
  getFileUrl(fileId: string): Promise<string>;
  deleteFile(fileId: string): Promise<void>;
}

const ROOT_DIR = 'attachments';

class StorageService implements FileStorage {
  private rootPromise: Promise<FileSystemDirectoryHandle>;

  constructor() {
    this.rootPromise = this.init();
  }

  private async init() {
    const root = await navigator.storage.getDirectory();
    // Create the attachments directory if it doesn't exist
    return root.getDirectoryHandle(ROOT_DIR, { create: true });
  }

  /**
   * Saves a file to OPFS
   * @param file The file or blob to save
   * @returns Metadata about the stored file
   */
  async saveFile(file: File): Promise<StoredFile> {
    const dir = await this.rootPromise;
    const id = crypto.randomUUID();

    // Create a file handle in OPFS
    const fileHandle = await dir.getFileHandle(id, { create: true });
    const writable = await fileHandle.createWritable();

    await writable.write(file);
    await writable.close();

    return {
      id,
      originalName: file.name,
      type: file.type,
      size: file.size,
    };
  }

  /**
   * Retrieves a file from OPFS as a Blob
   * @param fileId The UUID of the file
   */
  async getFile(fileId: string): Promise<File> {
    const dir = await this.rootPromise;
    const fileHandle = await dir.getFileHandle(fileId);
    return fileHandle.getFile();
  }

  /**
   * Creates a transient URL for the file (useful for <img> tags)
   * NOTE: The caller is responsible for revoking this URL with URL.revokeObjectURL()
   */
  async getFileUrl(fileId: string): Promise<string> {
    const file = await this.getFile(fileId);
    return URL.createObjectURL(file);
  }

  /**
   * Deletes a file from OPFS
   * @param fileId The UUID of the file
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      const dir = await this.rootPromise;
      await dir.removeEntry(fileId);
    } catch (error) {
      console.warn(`Failed to delete file ${fileId} from OPFS:`, error);
      // We don't throw here to avoid blocking DB cleanup if a file is already gone
    }
  }
}

class ServerStorageService implements FileStorage {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async saveFile(_file: File): Promise<StoredFile> {
    return {
      id: 'mock-id',
      originalName: 'mock-file',
      type: 'application/octet-stream',
      size: 0,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getFile(_fileId: string): Promise<File> {
    // Return an empty file to satisfy the type
    if (typeof File !== 'undefined') {
      return new File([], 'mock-file');
    }
    // Fallback if File is not globally available (though it usually is in Node 20)
    return {} as File;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getFileUrl(_fileId: string): Promise<string> {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteFile(_fileId: string): Promise<void> {
    // No-op
  }
}

export const fileStorage: FileStorage =
  typeof window === 'undefined'
    ? new ServerStorageService()
    : new StorageService();
